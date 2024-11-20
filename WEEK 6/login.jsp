<%@ page import="java.sql.*" %>
<%
    if ("POST".equalsIgnoreCase(request.getMethod()) && "login".equals(request.getParameter("action"))) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/user_management", "root", "");
            PreparedStatement pstmt = conn.prepareStatement(
                "SELECT * FROM users WHERE name = ? AND password = ?"
            );
            
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                session.setAttribute("user", username);
                response.sendRedirect("dashboard.jsp");
            } else {
                response.sendRedirect("login.jsp?error=true");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
%>

<!-- Login Form -->
<form method="post">
    <input type="hidden" name="action" value="login">
    Username: <input type="text" name="username"><br>
    Password: <input type="password" name="password"><br>
    <input type="submit" value="Login">
</form>
