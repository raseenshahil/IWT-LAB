import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class CookieServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        Cookie[] users = {
            new Cookie("user1", "pwd1"),
            new Cookie("user2", "pwd2"),
            new Cookie("user3", "pwd3"),
            new Cookie("user4", "pwd4")
        };
        
        for (Cookie cookie : users) {
            cookie.setMaxAge(24 * 60 * 60); // 24 hours
            response.addCookie(cookie);
        }
        
        PrintWriter out = response.getWriter();
        out.println("Cookies Created Successfully!");
        
        Cookie[] existingCookies = request.getCookies();
        if (existingCookies != null) {
            for (Cookie cookie : existingCookies) {
                out.println(cookie.getName() + ": " + cookie.getValue());
            }
        }
    }
}
