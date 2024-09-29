from datetime import datetime, timedelta, date
import json

#Business
class Business:
    def __init__(self, name=None):
        self.id = None
        self.name = name if name is not None else ""
        self.status = "Active"
        self.created_date = datetime.now()
        self.description = ""
        self.registered_name = ""
        self.governmant_id = ""
        self.website = ""
        self.primary_street_1 = ""
        self.primary_street_2 = ""
        self.primary_state = ""
        self.primary_country = ""
        self.primary_postal_code = ""
        self.primary_phone = ""
        self.primary_email = ""
        self.primary_industry = ""
        self.annual_revenue = ""
        self.number_of_employees = ""

        self.info()

    def info(self):
        output = {}
        for attr_name in dir(self):
            if not attr_name.startswith("__"):  # Skip internal attributes
                attr_value = getattr(self, attr_name)
                output[attr_name] = attr_value
        print("Business created: ", output)
        return json.dumps(output)

#Person
class Person:
    def __init__(self, first_name, last_name, middle_name=None):
        self.id = None
        self.first_name = first_name
        self.last_name = last_name
        self.middle_name = middle_name if middle_name is not None else ""
        if len(self.middle_name)>0:  # Check if middle name exists
            self.name = f"{first_name} {middle_name[0]}. {last_name}"
        else:
            self.name = f"{first_name} {last_name}"
        self.status = "Active"
        self.created = datetime.now()
        self.company = ""
        self.job_title = ""
        self.business_unit = ""
        self.manager = ""
        self.work_phone = ""
        self.work_email = ""
        self.personal_phone = ""
        self.personal_email = ""
        self.date_of_birth = ""
        self.gender = ""
        self.ethnicity = ""
        self.citizenship = ""
        self.marital_status = ""
        self.veteran = ""

        self.info()

    def info(self):
        output = {}
        for attr_name in dir(self):
            if not attr_name.startswith("__"):  # Skip internal attributes
                attr_value = getattr(self, attr_name)
                output[attr_name] = attr_value
        print("Person created: ", output)
        return json.dumps(output)


#Customer Service Ticket
class ServiceTicket:
    def __init__(self, customer_account, contact_person, subject, description):
        self.id = None
        self.customer_account = customer_account
        self.contact_person = contact_person
        self.subject = subject
        self.description = description
        self.created_date = datetime.now()
        self.created_by = None
        self.status = "Open"
        self.stage = "Draft"
        self.risk_level = "Low"
        self.agent = None
        self.last_updated = datetime.now()
        self.attachments = []
        self.history = []
        self.notes = []
        self.reminders = []

    def info(self):
        output = {}
        for attr_name in dir(self):
            if not attr_name.startswith("__"):  # Skip internal attributes
                attr_value = getattr(self, attr_name)
                output[attr_name] = attr_value
        print("Person created: ", output)
        return json.dumps(output)

#Invoice
class Invoice:
    def __init__(self, user, name, description, supplier, receieved_date):
        self.id = None
        self.name = name
        self.description = description
        self.created_at = datetime.now()
        self.created_by = user
        self.received = receieved_date if receieved_date is not None else datetime.now().date()
        self.status = "Open"
        self.stage = "Draft"
        self.risk_level = "Low"
        self.last_updated = datetime.now()
        self.line_items = []
        self.attachments = []
        self.history = []
        self.notes = []
        self.reminders = []
        self.number_of_items = 0
        self.total_amount = 0
        self.currency = "USD"
        self.supplier = [supplier]
        self.purchase_orders = []
        self.contracts = []
        self.payments = []
        self.approver = None
        self.approval_date = None
        self.due_date = self.received_date + timedelta(days=30)
        self.payment_term = ""
        self.days_past_due = None
        self.dpo = 0
        self.working_capital_impact = 0

    def info(self):
        output = {}
        for attr_name in dir(self):
            if not attr_name.startswith("__"):  # Skip internal attributes
                attr_value = getattr(self, attr_name)
                output[attr_name] = attr_value
        print("Invoice created: ", output)
        return json.dumps(output)
    
    def calculate_total(self):
        total_amount = sum(item["quantity"] * item["price"] for item in self.line_items)
        self.total_amount = total_amount
        output = {"total_amount":self.total_amount}
        print(output)
        return json.dumps(output)

    def add_line_item(self, name, quantity, price, description=None):
        line_item = {"id": len(self.line_items)+1,"name": name, "description": description, "quantity": quantity, "price": price, "amount": quantity*price}
        self.line_items.append(line_item)
        self.number_of_items += 1
        output = {"line_items":self.line_items}
        print(output)
        return json.dumps(output)

    def remove_line_item(self, index):
        if index >= 0 and index < len(self.line_items):
            del self.line_items[index]
            self.number_of_items -= 1
        output = {"line_items":self.line_items}
        print(output)
        return json.dumps(output)

    def update_status(self, new_status):
        self.status = new_status
        output = {"status":self.status}
        print(output)
        return json.dumps(output)

    def assign_agent(self, agent):
        self.approver = agent
        output = {"approver":self.approver}
        print(output)
        return json.dumps(output)

    def add_attachment(self, attachment):
        self.attachments.append(attachment)
        output = {"attachments":self.attachments}
        print(output)
        return json.dumps(output)
    
    def generate_pdf(self):
        # Code to generate PDF from invoice data
        pass

    def record_payment(self, payment_method, amount, date):
        payment = {"method": payment_method, "amount": amount, "date": date}
        self.payments.append(payment)
        output = {"payments":self.payments}
        print(output)
        return json.dumps(output)

    def update_history(self, action, timestamp):
        log_entry = {"action": action, "timestamp": timestamp}
        self.history.append(log_entry)
        output = {"history":self.history}
        print(output)
        return json.dumps(output)

    def approve(self):
        self.status = "Approved"
        output = {"status":self.status}
        print(output)
        return json.dumps(output)

    def reject(self):
        self.status = "Rejected"
        output = {"status":self.status}
        print(output)
        return json.dumps(output)

    def set_due_date(self, due_date):
        self.due_date = due_date
        output = {"set_due_date":self.set_due_date}
        print(output)
        return json.dumps(output)

    def add_reminder(self, note, reminder_date, reminder_time):
        reminder = {"id": len(self.reminders)+1,"note": note, "reminder_date": reminder_date, "reminder_time": reminder_time}
        self.reminders.append(reminder)
        output = {"reminders":self.reminders}
        print(output)
        return json.dumps(output)

    def calculate_working_capital_impact(self, cost_of_capital=None):
        cost_of_capital = cost_of_capital if cost_of_capital is not None else 0.1
        received_date = self.received
        today = datetime.now().date()
        due_date = self.due_date
        status = self.status
        if status != "Approved" and status != "Rejected" and due_date - today >0:
            dpo = today - received_date
            self.working_capital_impact = dpo*self.total_amount*cost_of_capital/365
            self.dpo = dpo
        elif status == "Approved" or status == "Rejected":
            dpo = self.approval_date - received_date
            self.working_capital_impact = dpo*self.total_amount*cost_of_capital/365
            self.dpo = dpo
        else:
            dpo = 0
            self.working_capital_impact = dpo*self.total_amount*cost_of_capital/365
            self.dpo = dpo
        output = {
            "dpo": self.dpo,
            "working_capital_impact": self.working_capital_impact
        }
        print(output)
        return json.dumps(output)

#Purchase Order
class PurchaseOrder:
    def __init__(self, user, name, description, supplier, receieved_date):
        self.id = None
        self.name = name
        self.description = description
        self.created_at = datetime.now()
        self.created_by = user
        self.received = receieved_date if receieved_date is not None else datetime.now().date()
        self.status = "Open"
        self.stage = "Draft"
        self.risk_level = "Low"
        self.last_updated = datetime.now()
        self.line_items = []
        self.attachments = []
        self.history = []
        self.notes = []
        self.reminders = []
        self.number_of_items = 0
        self.total_amount = 0
        self.currency = "USD"
        self.business_consumer = []
        self.supplier = [supplier]
        self.requests = []
        self.requesters = []
        self.invoices = []
        self.contracts = []
        self.payments = []
        self.processor = None
        self.approval_date = None
        self.approval_chains = []

    def info(self):
        output = {}
        for attr_name in dir(self):
            if not attr_name.startswith("__"):  # Skip internal attributes
                attr_value = getattr(self, attr_name)
                output[attr_name] = attr_value
        print("Invoice created: ", output)
        return json.dumps(output)
    
    def calculate_total(self):
        total_amount = sum(item["quantity"] * item["price"] for item in self.line_items)
        self.total_amount = total_amount
        output = {"total_amount":self.total_amount}
        print(output)
        return json.dumps(output)

    def add_line_item(self, name, quantity, price, description=None):
        line_item = {"id": len(self.line_items)+1,"name": name, "description": description, "quantity": quantity, "price": price, "amount": quantity*price}
        self.line_items.append(line_item)
        self.number_of_items += 1
        output = {"line_items":self.line_items}
        print(output)
        return json.dumps(output)

    def remove_line_item(self, index):
        if index >= 0 and index < len(self.line_items):
            del self.line_items[index]
            self.number_of_items -= 1
        output = {"line_items":self.line_items}
        print(output)
        return json.dumps(output)

    def update_status(self, new_status):
        self.status = new_status
        output = {"status":self.status}
        print(output)
        return json.dumps(output)

    def assign_agent(self, agent):
        self.approver = agent
        output = {"approver":self.approver}
        print(output)
        return json.dumps(output)

    def add_attachment(self, attachment):
        self.attachments.append(attachment)
        output = {"attachments":self.attachments}
        print(output)
        return json.dumps(output)

    def update_history(self, action, timestamp):
        log_entry = {"action": action, "timestamp": timestamp}
        self.history.append(log_entry)
        output = {"history":self.history}
        print(output)
        return json.dumps(output)

    def approve(self):
        self.status = "Approved"
        output = {"status":self.status}
        print(output)
        return json.dumps(output)

    def reject(self):
        self.status = "Rejected"
        output = {"status":self.status}
        print(output)
        return json.dumps(output)

    def add_reminder(self, note, reminder_date, reminder_time):
        reminder = {"id": len(self.reminders)+1,"note": note, "reminder_date": reminder_date, "reminder_time": reminder_time}
        self.reminders.append(reminder)
        output = {"reminders":self.reminders}
        print(output)
        return json.dumps(output)


#Customer Account
class Customer:
    def __init__(self, ticket_id, issue_description):
        self.ticket_id = ticket_id
        self.issue_description = issue_description
        self.status = "Open"

    def display_info(self):
        print(f"Ticket ID: {self.ticket_id}")
        print(f"Issue Description: {self.issue_description}")
        print(f"Status: {self.status}")



#Lead
class Lead:
    def __init__(self, ticket_id, issue_description):
        self.ticket_id = ticket_id
        self.issue_description = issue_description
        self.status = "Open"

    def display_info(self):
        print(f"Ticket ID: {self.ticket_id}")
        print(f"Issue Description: {self.issue_description}")
        print(f"Status: {self.status}")