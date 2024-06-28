import React from "react";
import "./styles.css"; // Adicione o arquivo CSS para estilos

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-content-terms-title">Termos e Condições de Uso</h2>
        <div className="modal-content-terms-text">
          <h3 className="modal-content-terms-subtitle">1. Introdução</h3>

          <p className="modal-content-terms-p">
            Bem-vindo ao PataFinanceira! Estes Termos de Uso regem o uso do
            nosso serviço e ao criar uma conta, você concorda em cumprir e estar
            legalmente vinculado a estes termos.
          </p>
          <h3 className="modal-content-terms-subtitle">2. Coleta de Dados</h3>

          <p className="modal-content-terms-p">
            Ao criar uma conta no PataFinanceira, você concorda em fornecer
            informações pessoais, incluindo seu nome completo e endereço de
            e-mail, para fins de cadastro. As informações fornecidas serão
            utilizadas para: Identificação do usuário no sistema comunicação e
            envio de informações relevantes sobre o serviço manutenção e
            melhoria dos serviços oferecidos
          </p>
          <h3 className="modal-content-terms-subtitle">
            3. Armazenamento de Senha
          </h3>

          <p className="modal-content-terms-p">
            A sua senha será armazenada de forma segura e criptografada. Não
            temos acesso à sua senha em texto simples e tomamos medidas
            rigorosas para proteger suas informações pessoais contra acesso não
            autorizado.
          </p>
          <h3 className="modal-content-terms-subtitle">4. Uso de Dados</h3>

          <p className="modal-content-terms-p">
            Os dados coletados serão utilizados para: Fornecer e personalizar
            nossos serviços, realizar melhorias e atualizações de segurança,
            entrar em contato com você para enviar notificações importantes,
            atualizações e ofertas especiais
          </p>
          <h3 className="modal-content-terms-subtitle">5. Privacidade</h3>

          <p className="modal-content-terms-p">
            Levamos sua privacidade a sério. Os seus dados pessoais não serão
            vendidos, trocados ou transferidos para terceiros sem o seu
            consentimento, exceto conforme necessário para cumprir a lei ou
            proteger nossos direitos.
          </p>
          <h3 className="modal-content-terms-subtitle">
            6. Responsabilidades do Usuário
          </h3>

          <p className="modal-content-terms-p">
            Ao utilizar nosso serviço, você concorda em: Fornecer informações
            precisas e completas ao criar sua conta, manter a confidencialidade
            de sua senha e outras credenciais de login, notificar-nos
            imediatamente de qualquer uso não autorizado de sua conta, não
            utilizar o serviço para qualquer finalidade ilegal ou não autorizada
          </p>

          <h3 className="modal-content-terms-subtitle">
            7. Alterações nos Termos
          </h3>

          <p className="modal-content-terms-p">
            Reservamo-nos o direito de alterar estes Termos de Uso a qualquer
            momento. Notificaremos você sobre quaisquer alterações
            significativas e seu uso continuado do serviço após tais
            notificações constituirá sua aceitação dos novos termos.
          </p>
          <h3 className="modal-content-terms-subtitle">8. Rescisão</h3>

          <p className="modal-content-terms-p">
            Podemos suspender ou encerrar sua conta e acesso ao serviço a
            qualquer momento, sem aviso prévio, se acreditarmos que você violou
            estes Termos de Uso.
          </p>
          <h3 className="modal-content-terms-subtitle">
            9. Limitação de Responsabilidade
          </h3>

          <p className="modal-content-terms-p">
            O PataFinanceira não será responsável por quaisquer danos diretos,
            indiretos, incidentais, consequenciais ou punitivos decorrentes do
            uso ou da incapacidade de usar nosso serviço.
          </p>
          <h3 className="modal-content-terms-subtitle">10. Contato</h3>

          <p className="modal-content-terms-p">
            Se você tiver quaisquer dúvidas sobre estes Termos de Uso, entre em
            contato conosco através do e-mail: suportepatafinanceira@gmail.com.
          </p>
          <h3 className="modal-content-terms-subtitle">
            11. Aceitação dos Termos
          </h3>

          <p className="modal-content-terms-p">
            Ao criar uma conta, você confirma que leu, entendeu e concorda com
            estes Termos de Uso.
          </p>
        </div>
        <button className="close-button" onClick={onClose}>
          Entendi
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
