import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleCognitoCallback } from "../auth/authService";

export const AuthCallback: React.FC = () => {
  const [status, setStatus] = useState("Verifying AWS Cognito credentials...");
  const navigate = useNavigate();

  useEffect(() => {
    handleCognitoCallback()
      .then((user) => {
        if (user) {
          setStatus("Authentication successful! Loading dashboard...");
          navigate("/dashboard", { replace: true });
        }
      })
      .catch((err) => {
        console.error("Cognito login error:", err);
        setStatus("Sign-in verification failed. Redirecting to login...");
        setTimeout(() => navigate("/auth", { replace: true }), 2000);
      });
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.spinner} />
        <h2 style={styles.title}>MedGuardian AI Portal</h2>
        <p style={styles.status}>{status}</p>
      </div>
    </div>
  );
};

export default AuthCallback;

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Inter", sans-serif',
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    textAlign: "center",
    boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.05)",
    maxWidth: "400px",
    width: "90%",
  },
  title: {
    margin: "16px 0 8px",
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#0f172a",
  },
  status: {
    color: "#64748b",
    fontSize: "0.95rem",
    margin: 0,
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #0f766e",
    borderRadius: "50%",
    margin: "0 auto",
  },
};