import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(sender_email, receiver_email, subject, message_body, smtp_server, smtp_port, smtp_username, smtp_password):
    # Create a MIME multipart message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    # Add message body
    message.attach(MIMEText(message_body, "plain"))

    # Connect to SMTP server
    with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
        server.login(smtp_username, smtp_password)
        server.send_message(message)

# Example usage
sender_email = "avikghosh03@gmail.com"
receiver_email = "avik.ghosh@nightnlabs.com"
subject = "Test Email"
message_body = "This is a test email sent from Python."
smtp_server = "smtp.gmail.com"
smtp_port = 465  # Gmail SMTP port for SSL
smtp_username = "avikghosh03@gmail.com"
smtp_password = "Aggoogle03$3"

send_email(sender_email, receiver_email, subject, message_body, smtp_server, smtp_port, smtp_username, smtp_password)
