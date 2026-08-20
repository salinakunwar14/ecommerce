import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message sent! We\'ll get back to you shortly.");
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="site-frame">
          <p className="eyebrow">Contact</p>
          <h2>Need a hand?</h2>
          <p className="page-subtitle">Questions about sizing, styling, or your order? Our team is here to help.</p>
        </div>
      </div>

      <div className="page-body site-frame">
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in touch</h3>
            <p>
              We aim to reply within one working day. Whether you need sizing advice,
              have a question about an order, or just want to say hello — we'd love to
              hear from you.
            </p>
            <div className="contact-detail">
              <strong>Email</strong>
              <a href="mailto:hello@buyme.example">hello@buyme.example</a>
            </div>
            <div className="contact-detail">
              <strong>Hours</strong>
              <span>Monday — Friday, 9am — 5pm GMT</span>
            </div>
          </div>

          <div className="contact-form">
            {submitted ? (
              <div className="contact-success">
                <h3>Message sent</h3>
                <p>Thanks for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                  />
                </div>
                <button type="submit" className="rose-button">Send message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
