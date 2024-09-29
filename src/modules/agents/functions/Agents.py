from BusinessObjects import ServiceTicket, Invoice, PurchaseOrder, Customer, Supplier, Contact
import json
from server import getData, sendEmail, customLLM
from datetime import datetime, timedelta, date

class Agent:
    def __init__(self, id=None, name=None, type=None, status=None, gender=None, language=None, generation=None, skill_level=None, tone = None, icon=None, photo=None):
        self.id = id if id is not None else "000001"
        self.name = name if name is not None else "General Agent"
        self.type = type if type is not None else "General"
        self.status = status if status is not None else "Active"
        self.gender = gender if gender is not None else "Female"
        self.language = language if language is not None else "English"
        self.generation = generation if generation is not None else "Gen X"
        self.skill_level = skill_level if skill_level is not None else "Medium"
        self.tone = tone if tone is not None else "Neutral"
        self.icon = icon
        self.photo = photo
        
    def display_info(self):
        output = {}
        for attr_name in dir(self):
            if not attr_name.startswith("__"): 
                attr_value = getattr(self, attr_name)
                output[attr_name] = attr_value
        print(output)
        return json.dumps(output)

    def perform_action(self, action):
        if self.energy >= 10:
            print(f"{self.name} is performing action: {action}")
            self.energy -= 10
        else:
            print(f"{self.name} does not have enough energy to perform action.")


#Call Center Agent
class CallCenterAgent(Agent):
    def __init__(self, name, intelligence_level, department=None, performance_rating=3, tier=None):
        super().__init__(name, intelligence_level)
        self.department = department
        self.tier = tier
        self.performance_rating = performance_rating
        
    def open_issue(self, subject, description, risk_level, customer_account):
        new_ticket = ServiceTicket(customer_account, subject, description, risk_level)
        print(f"{self.name} from {self.department} has opened an issue: {new_ticket} for customer: {customer_account}")

    def close_issue(self, service_ticket):
        service_ticket["status"] = "closed"
        print(f"{self.name} from {self.department} has closed: {service_ticket.id}")

    def escalate_issue(self, service_ticket):
        service_ticket["stage"] += 1 if self.tier<3 else 3
        print(f"{self.name} from {self.department} has de-escalated the issue for: {service_ticket.id} to {service_ticket.stage}")

    def de_escalate_issue(self, service_ticket):
        service_ticket["stage"] -= 1 if self.tier<3 else 1
        print(f"{self.name} from {self.department} has de-escalated the issue for: {service_ticket.id} to {service_ticket.stage}")

    def upsell(self, account, run_upsell_LLM_script):
        run_upsell_LLM_script(account)
        print(f"{self.name} from {self.department} the issue: {account}")
        

#Accounts Payable Agent
class APAgent(Agent):
    def __init__(self, name, skill_level, department=None, tier=None):
        super().__init__(name, skill_level)
        self.department = department
    
    def validate_supplier_info(self, invoice):
        validation_result = customLLM.validate_supplier(invoice.supplier_name)
        invoice.update_history(action=validation_result, timestamp=datetime.now())
        return validation_result

    def validate_invoice(self, invoice):
        validation_result = customLLM.validate_invoice(invoice)
        invoice.update_history(action=validation_result, timestamp=datetime.now())
        return validation_result

    def email_supplier(self, invoice):
        message = customLLM.generate_supplier_message(invoice, category="invoice_dispute")
        sendEmail(invoice.supplier.email,message)
        invoice.update_history(action="Email sent to supplier", timestamp=datetime.now())

    def ok_to_pay(self, invoice, payment_date = None):
        percentage_amount = 1
        payment_date = payment_date if payment_date is not None else date
        customLLM.pay_invoice(invoice, percentage_amount, payment_date)
        message = customLLM.generate_supplier_message(invoice, category="invoice_approval")
        sendEmail(invoice.supplier.email,message)
        invoice.update_history(action="Invoice approved.  Supplier notified via email", timestamp=datetime.now())


#Procurement Agent
class ProcurementAgent(Agent):
    def __init__(self, name, skill_level, department=None, tier=None):
        super().__init__(name, skill_level)
        self.departments = []
        self.categories = []
    
    def check_inventory(self, purchase_request):
        validation_result = customLLM.check_inventory(purchase_request.request_details,purchase_request.preferred_supplier)
        purchase_request.update_history(action=validation_result, timestamp=datetime.now())
        return validation_result

    def check_catalogs(self, purchase_request):
        validation_result = customLLM.check_catalogs(purchase_request.request_details,purchase_request.preferred_supplier)
        purchase_request.update_history(action=validation_result, timestamp=datetime.now())
        return validation_result

    def request_quotes(self, purchase_request, suppliers):
        quote_package = customLLM.prepare_quote_package(purchase_request,suppliers)
        for supplier in quote_package.suppliers:
            self.message_supplier(supplier, content=quote_package, message_type="quote_request")
            purchase_request.update_history(action=quote_package, timestamp=datetime.now())

    def request_strategic_sourcing(self, purchase_request):
        sourcing_event = customLLM.prepare_sourcing_event(purchase_request)
        self.message_sourcing_manager(self, sourcing_event, message_type="request_for_sourcing")
        sourcing_event.update_history(action="New event created", timestamp=datetime.now())
        purchase_request.update_history(action=sourcing_event, timestamp=datetime.now())

    def message_supplier(self, purchase_request, content, message_type):
        message = customLLM.generate_supplier_message(content, category=message_type)
        sendEmail(content.supplier.email,message)
        purchase_request.update_history(action="Email sent to supplier", timestamp=datetime.now())

    def message_sourcing_manager(self, sourcing_event):
        message = customLLM.generate_message(sourcing_event, message_type)
        sendEmail(content.supplier.email,message)
        sourcing_event.update_history(action="Email sent to supplier", timestamp=datetime.now())

    def message_business_consumer(self, invoice):
        message = customLLM.generate_supplier_message(invoice, category="invoice_dispute")
        sendEmail(invoice.supplier.email,message)
        invoice.update_history(action="Email sent to supplier", timestamp=datetime.now())

    def approve_po(self, invoice, payment_date = None):
        percentage_amount = 1
        payment_date = payment_date if payment_date is not None else date
        customLLM.pay_invoice(invoice, percentage_amount, payment_date)
        message = customLLM.generate_supplier_message(invoice, category="invoice_approval")
        sendEmail(invoice.supplier.email,message)
        invoice.update_history(action="Invoice approved.  Supplier notified via email", timestamp=datetime.now())

    
