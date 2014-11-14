package dev;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Servlet implementation class LayerInterface
 */
public class LayerInterface extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LayerInterface() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		StringBuilder sb = new StringBuilder();
		String strRequest = "";

		// fetch post params
		while ((strRequest = request.getReader().readLine()) != null) {
			System.out.println("RCVD strRequest=" + strRequest);
			sb.append(strRequest);
		}

		// convert STRING to JSON
		JSONObject jsonFormatterObject;
		try {
			jsonFormatterObject = new JSONObject(sb.toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			jsonFormatterObject = new JSONObject();
			e.printStackTrace();
		}

		// printing the VALUES & sending mail
		try {
			System.out
					.println(" MESSAGE " + jsonFormatterObject.get("message"));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// sending email
		// Recipient's email ID needs to be mentioned.
		String to = "dr.supriya2186@gmail.com";
		try {
			to = (String) jsonFormatterObject.get("email");
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		// Sender's email ID needs to be mentioned
		String from = "testoman02@gmail.com";
		// Assuming you are sending email from localhost
		String host = "smtp.gmail.com";
		final String username = "testoman02@gmail.com";// change accordingly
		final String password = "code@1234";// change accordingly

		// Get system properties
		Properties properties = System.getProperties();
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.user", from);
		properties.put("mail.smtp.password", password);
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", "587");

		// Get the default Session object.
		// Session session = Session.getDefaultInstance(properties);
		Session session = Session.getInstance(properties,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(username, password);
					}
				});

		try {
			// Create a default MimeMessage object.
			MimeMessage message = new MimeMessage(session);
			// Set From: header field of the header.
			message.setFrom(new InternetAddress(from));
			// Set To: header field of the header.
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					to));

			// Set Subject: header field
			try {
				message.setSubject(" MAIL FROM:"
						+ jsonFormatterObject.get("name"));

				// Now set the actual message
				message.setText(" EMAIL :" + jsonFormatterObject.get("email")
						+ "\n ADDRESS:  " + jsonFormatterObject.get("address")
						+ "\n MESSAGE:  " + jsonFormatterObject.get("message")
						+ "\n Phone:  " + jsonFormatterObject.get("phone"));
				
				System.out.println("message sent");
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// Send message
			Transport.send(message);

		} catch (MessagingException mex) {
			System.out.println("Exception !!");
			mex.printStackTrace();
		}

		// Create Return Object

		JSONObject returnJson = new JSONObject();
		try {
			returnJson.put("success", "true");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		response.setContentType("application/json");

		PrintWriter out = response.getWriter();
		out.write(returnJson.toString());
		out.close();

	}

}
