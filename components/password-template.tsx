import * as React from "react";

interface EmailTemplateProps {
  codeVerification: string;
}

export const PasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  codeVerification
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333",
    }}
  >
    <h1 style={{ color: "#4CAF50" }}>Bonjour,</h1>
    <p style={{ fontSize: "16px" }}>
      Nous avons reçu une demande de réinitialisation de votre mot de passe pour
      votre compte MedicaleCare. Pour procéder à la réinitialisation, veuillez
      utiliser le code de vérification ci-dessous :
    </p>

    <div
      style={{
        padding: "10px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        display: "inline-block",
        marginTop: "10px",
        marginBottom: "20px",
      }}
    >
      <strong style={{ fontSize: "1.2em", color: "#555" }}>
        {codeVerification}
      </strong>
    </div>
    <p style={{ fontSize: "16px" }}>
      Veuillez entrer ce code dans le formulaire de réinitialisation de mot de
      passe sur notre site web.
      <br />
      Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet
      e-mail. Votre mot de passe actuel restera inchangé.
    </p>
    <p style={{ fontSize: "16px" }}>
      Cordialement,
      <br />
      L'équipe de Medicalecare
    </p>
    <footer style={{ marginTop: "20px", fontSize: "1.2em", color: "#888" }}>
      <p>© 2024 Medicalecare. Tous droits réservés.</p>
      <p>
        Si vous avez des questions, n'hésitez pas à nous contacter à
        <a
          href="mailto:medicalecare@gmail.com"
          style={{ color: "#4CAF50", textDecoration: "none" }}
        >
          {" "}
          medicalecare@gmail.com
        </a>
        .
      </p>
    </footer>
  </div>
);
