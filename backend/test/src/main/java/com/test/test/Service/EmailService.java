package com.test.test.Service;

import com.test.test.Entity.CartItem;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Replace the following with your actual Twilio Account SID in production
    private static final String ACCOUNT_SID = "TWILIO_ACCOUNT_SID_PLACEHOLDER"; // TODO: Use env variable in production
    // Replace the following with your actual Twilio Auth Token in production
    private static final String AUTH_TOKEN = "TWILIO_AUTH_TOKEN_PLACEHOLDER"; // TODO: Use env variable in production
    // Replace the following with your actual Twilio phone number in production
    private static final String TWILIO_PHONE_NUMBER = "+1234567890_PLACEHOLDER"; // TODO: Use env variable in production

    static {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public void sendEmail(String toEmail, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom("priceamed03@gmail.com");

            mailSender.send(message);
            System.out.println("Email sent to " + toEmail);

        } catch (Exception e) {
            System.out.println("Failed to send email to " + toEmail + ". Error: " + e.getMessage());
        }
    }
    public void sendSms(String toPhoneNumber, String messageBody) {
        try {
            Message message = Message.creator(
                    new PhoneNumber("+91" + toPhoneNumber),  // Ensure this is in E.164 format
                    new PhoneNumber(TWILIO_PHONE_NUMBER),    // Your Twilio phone number
                    messageBody
            ).create();
            System.out.println("SMS sent to " + toPhoneNumber);
        } catch (Exception e) {
            System.out.println("Failed to send SMS to " + toPhoneNumber + ". Error: " + e.getMessage());
        }
    }

    public void sendMimeEmail(String toEmail, String subject, String body) {
        try {
            // Create a new MimeMessage
            MimeMessage message = mailSender.createMimeMessage();

            // Create a helper to set the details for the message
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            // Set the email details
            helper.setFrom("priceamed03@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subject);

            // Set the content as HTML
            helper.setText(body, true); // Set true to indicate it's HTML content

            // Send the email
            mailSender.send(message);
            System.out.println("HTML Email sent to " + toEmail);

        } catch (MessagingException e) {
            System.out.println("Failed to send MIME email to " + toEmail + ". Error: " + e.getMessage());
        }
    }


    public void sendOrderSummaryEmail(Long orderId, String userEmail, List<CartItem> userCart, double totalPrice, double deliveryCharge) {
        StringBuilder emailContent = new StringBuilder();

        // Calculate subtotal (total price of items before delivery charge)
        double subtotal = 0.0;
        for (CartItem item : userCart) {
            subtotal += item.getUnitPrice() * item.getQuantity();  // Multiply price by quantity for each item
        }

        double total = subtotal + deliveryCharge;  // Total cost including delivery charges

        // Build the email content
        emailContent.append("<!DOCTYPE html>")
                .append("<html lang=\"en\">")
                .append("<head>")
                .append("<meta charset=\"UTF-8\">")
                .append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">")
                .append("<title>Order Summary</title>")
                .append("<style>")
                .append("body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }")
                .append(".container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }")
                .append("h1 { text-align: center; color: #555; }")
                .append("table { width: 100%; border-collapse: collapse; margin: 20px 0; }")
                .append("th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }")
                .append("th { background-color: #f4f4f4; }")
                .append(".total { font-weight: bold; }")
                .append("</style>")
                .append("</head>")
                .append("<body>")
                .append("<div class=\"container\">")
                .append("<h1>Order Summary</h1>")
                .append("<p><strong>Order ID:</strong> ").append(orderId).append("</p>")
                .append("<table>")
                .append("<thead>")
                .append("<tr>")
                .append("<th>Item Name</th>")
                .append("<th>Quantity</th>")
                .append("<th>Price</th>")
                .append("</tr>")
                .append("</thead>")
                .append("<tbody>");

        // Iterate through the cart items and add them to the email content
        for (CartItem item : userCart) {
            emailContent.append("<tr>")
                    .append("<td>").append(item.getMedication().getMedName()).append("</td>")  // Assuming CartItem has Medication info
                    .append("<td>").append(item.getQuantity()).append("</td>")
                    .append("<td>$").append(String.format("%.2f", item.getUnitPrice())).append("</td>")
                    .append("</tr>");
        }

        emailContent.append("</tbody>")
                .append("</table>")
                .append("<p><strong>Subtotal:</strong> $").append(String.format("%.2f", subtotal)).append("</p>")
                .append("<p><strong>Delivery Charge:</strong> $").append(String.format("%.2f", deliveryCharge)).append("</p>")
                .append("<p class=\"total\"><strong>Total:</strong> $").append(String.format("%.2f", total)).append("</p>")
                .append("</div>")
                .append("</body>")
                .append("</html>");

        // Send the email (assuming you have a configured email service)
        sendMimeEmail(userEmail, "Your Order Summary", emailContent.toString());
    }


}
