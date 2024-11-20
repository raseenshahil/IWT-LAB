<%@ page import="java.sql.*" %>
<%
    if ("POST".equalsIgnoreCase(request.getMethod()) && "register".equals(request.getParameter("action"))) {
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/user_management", "root", "");
            PreparedStatement pstmt = conn.prepareStatement(
                "INSERT INTO users (name, password, email, phone_number) VALUES (?, ?, ?, ?)"
            );
            
            pstmt.setString(1, name);
            pstmt.setString(2, password);
            pstmt.setString(3, email);
            pstmt.setString(4, phone);
            
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
%>

<!-- Registration Form -->
<form method="post">
    <input type="hidden" name="action" value="register">
    Name: <input type="text" name="name"><br>
    Password: <input type="password" name="password"><br>
    Email: <input type="email" name="email"><br>
    Phone: <input type="tel" name="phone"><br>
    <input type="submit" value="Register">
</form>
