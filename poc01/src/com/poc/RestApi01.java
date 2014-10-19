package com.poc;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;

/**
 * Servlet implementation class RestApi01
 */
public class RestApi01 extends HttpServlet {
	private static final long serialVersionUID = 102831973239L;
      
	private String message;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RestApi01(String reqInput) throws ServletException {
        // TODO Auto-generated constructor stub
    	
    	
    	
        
    }
    public void init() throws ServletException{
    	// initialization 
    	message = "hello from servlet";
	}
    
    
    public void service(ServletRequest req, ServletResponse resp ) throws ServletException , IOException{
    	
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("<h1>"+message+"</h1>");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
