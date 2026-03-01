"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  Instagram,
  Facebook,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ──────────────────────── animation helpers ──────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ──────────────────────── TikTok SVG icon ──────────────────────── */

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.882 2.783 2.896 2.896 0 0 1-2.881-2.913 2.896 2.896 0 0 1 2.881-2.879c.302 0 .593.05.867.133V9.344a6.306 6.306 0 0 0-.867-.065A6.333 6.333 0 0 0 3.159 15.6 6.333 6.333 0 0 0 9.492 21.9a6.333 6.333 0 0 0 6.333-6.3V9.098a8.18 8.18 0 0 0 3.764.926V6.686Z" />
    </svg>
  );
}

/* ──────────────────────── FAQ data ──────────────────────── */

const faqs = [
  {
    question: "¿Cuál es el horario de atención?",
    answer:
      "Nuestro horario de atención es de lunes a viernes de 8:00 AM a 5:30 PM y los sábados de 8:00 AM a 5:00 PM. Los domingos permanecemos cerrados.",
  },
  {
    question: "¿Hacen envíos a otras ciudades?",
    answer:
      "Sí, realizamos envíos a las principales ciudades de Honduras a través de servicios de encomienda confiables. Los costos y tiempos de envío varían según la ubicación. Contáctanos por WhatsApp para más detalles sobre tu ciudad.",
  },
  {
    question: "¿Puedo comprar telas al por mayor?",
    answer:
      "Por supuesto. Ofrecemos precios especiales para compras al por mayor. Ya sea que necesites telas para tu negocio de confección, tapicería o cualquier proyecto grande, podemos hacerte una cotización personalizada. Escríbenos por WhatsApp o visítanos en tienda.",
  },
  {
    question: "¿Aceptan tarjetas de crédito/débito?",
    answer:
      "Sí, aceptamos pagos con tarjetas de crédito y débito de las principales marcas (Visa, Mastercard). También aceptamos efectivo y transferencias bancarias.",
  },
  {
    question: "¿Tienen servicio de corte de tela?",
    answer:
      "Sí, contamos con servicio de corte en tienda. Nuestro personal capacitado puede cortar la tela en las medidas exactas que necesites. No hay recargo adicional por este servicio.",
  },
  {
    question: "¿Puedo ver muestras antes de comprar?",
    answer:
      "Claro que sí. Te invitamos a visitar nuestra tienda donde podrás ver y tocar todas las telas disponibles. Si no puedes visitarnos, envíanos un mensaje por WhatsApp y con gusto te enviamos fotos y videos de las telas que te interesen.",
  },
  {
    question: "¿Tienen estacionamiento?",
    answer:
      "Si bien no contamos con estacionamiento propio, hay opciones de estacionamiento público disponibles en las cercanías de nuestra tienda en Barrio El Benque.",
  },
  {
    question: "¿Cómo puedo hacer un pedido por WhatsApp?",
    answer:
      "Es muy sencillo. Envía un mensaje al 9651-8484 indicando las telas que te interesan, las cantidades y medidas que necesitas. Nuestro equipo te responderá con disponibilidad, precios y opciones de pago. También puedes enviarnos fotos de referencia si buscas algo en específico.",
  },
];

/* ──────────────────────── main page ──────────────────────── */

export default function ContactoPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState("sending");
    // Simulate sending
    setTimeout(() => {
      setFormState("sent");
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      });
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-[#1B3A5C] py-20 md:py-28">
        {/* decorative fabric weave */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              className="mx-auto mb-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#D4A843] to-[#E0BD6A]"
            />
            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Contáctanos
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-xl text-lg text-white/80"
            >
              Estamos aquí para ayudarte a encontrar la tela perfecta
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT INFO CARDS ─── */}
      <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Ubicacion */}
          <motion.div
            variants={fadeUp}
            className="group rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1B3A5C]/10 text-[#1B3A5C] transition-colors group-hover:bg-[#1B3A5C] group-hover:text-white">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1A1A1A]">
              Ubicación
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#5C5C5C]">
              Barrio El Benque, 6ª Calle entre 10ª y 11ª Avenida SO, San Pedro
              Sula, Honduras 22021
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Barrio+El+Benque+San+Pedro+Sula+Honduras"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#1B3A5C] hover:text-[#D4A843]"
            >
              Cómo Llegar
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          {/* Telefono */}
          <motion.div
            variants={fadeUp}
            className="group rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1B3A5C]/10 text-[#1B3A5C] transition-colors group-hover:bg-[#1B3A5C] group-hover:text-white">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1A1A1A]">
              Teléfono
            </h3>
            <div className="mt-1 space-y-1">
              <a
                href="tel:+50496518484"
                className="block text-sm text-[#5C5C5C] hover:text-[#1B3A5C]"
              >
                9651-8484{" "}
                <span className="text-xs text-[#5C5C5C]/70">(Celular)</span>
              </a>
              <a
                href="tel:+50425583014"
                className="block text-sm text-[#5C5C5C] hover:text-[#1B3A5C]"
              >
                2558-3014{" "}
                <span className="text-xs text-[#5C5C5C]/70">(Fijo)</span>
              </a>
            </div>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            variants={fadeUp}
            className="group rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366] transition-colors group-hover:bg-[#25D366] group-hover:text-white">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1A1A1A]">
              WhatsApp
            </h3>
            <p className="mt-1 text-sm text-[#5C5C5C]">9651-8484</p>
            <a
              href="https://wa.me/50496518484"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#25D366] hover:text-[#1B3A5C]"
            >
              Enviar mensaje
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          {/* Horario */}
          <motion.div
            variants={fadeUp}
            className="group rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#D4A843]/10 text-[#D4A843] transition-colors group-hover:bg-[#D4A843] group-hover:text-white">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1A1A1A]">
              Horario
            </h3>
            <div className="mt-1 space-y-0.5 text-sm text-[#5C5C5C]">
              <p>Lun - Vie: 8:00 - 17:30</p>
              <p>Sábado: 8:00 - 17:00</p>
              <p className="text-[#C75B39]">Domingo: Cerrado</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FORM + MAP ─── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid gap-12 lg:grid-cols-2"
        >
          {/* ── Contact Form ── */}
          <motion.div variants={fadeUp}>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1A1A1A] md:text-3xl">
              Envíanos un mensaje
            </h2>
            <p className="mt-2 text-[#5C5C5C]">
              Completa el formulario y nos pondremos en contacto contigo lo
              antes posible.
            </p>

            {formState === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                className="mt-8 flex flex-col items-center rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 p-10 text-center"
              >
                <CheckCircle className="h-14 w-14 text-[#25D366]" />
                <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1A1A1A]">
                  ¡Mensaje enviado!
                </h3>
                <p className="mt-2 text-sm text-[#5C5C5C]">
                  Gracias por contactarnos. Te responderemos a la brevedad.
                </p>
                <Button
                  onClick={() => setFormState("idle")}
                  className="mt-6 bg-[#1B3A5C] text-white hover:bg-[#244D78]"
                >
                  Enviar otro mensaje
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="mb-1.5 block text-sm font-medium text-[#1A1A1A]"
                  >
                    Nombre completo
                  </label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="h-11 border-[#E5E0D5] bg-white focus-visible:border-[#D4A843] focus-visible:ring-[#D4A843]/30"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-[#1A1A1A]"
                  >
                    Correo electrónico
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    className="h-11 border-[#E5E0D5] bg-white focus-visible:border-[#D4A843] focus-visible:ring-[#D4A843]/30"
                  />
                </div>

                {/* Telefono */}
                <div>
                  <label
                    htmlFor="telefono"
                    className="mb-1.5 block text-sm font-medium text-[#1A1A1A]"
                  >
                    Teléfono
                  </label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="9999-9999"
                    className="h-11 border-[#E5E0D5] bg-white focus-visible:border-[#D4A843] focus-visible:ring-[#D4A843]/30"
                  />
                </div>

                {/* Asunto */}
                <div>
                  <label
                    htmlFor="asunto"
                    className="mb-1.5 block text-sm font-medium text-[#1A1A1A]"
                  >
                    Asunto
                  </label>
                  <Select
                    value={formData.asunto}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, asunto: value }))
                    }
                  >
                    <SelectTrigger className="h-11 w-full border-[#E5E0D5] bg-white focus-visible:border-[#D4A843] focus-visible:ring-[#D4A843]/30">
                      <SelectValue placeholder="Selecciona un asunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulta-general">
                        Consulta General
                      </SelectItem>
                      <SelectItem value="cotizacion-telas">
                        Cotización de Telas
                      </SelectItem>
                      <SelectItem value="pedido-mayor">
                        Pedido al por Mayor
                      </SelectItem>
                      <SelectItem value="disponibilidad">
                        Disponibilidad de Producto
                      </SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="mensaje"
                    className="mb-1.5 block text-sm font-medium text-[#1A1A1A]"
                  >
                    Mensaje
                  </label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={5}
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    className="min-h-[120px] border-[#E5E0D5] bg-white focus-visible:border-[#D4A843] focus-visible:ring-[#D4A843]/30"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={formState === "sending"}
                  className="h-12 w-full gap-2 bg-[#1B3A5C] text-base font-semibold text-white hover:bg-[#244D78] disabled:opacity-70"
                >
                  {formState === "sending" ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* ── Map ── */}
          <motion.div variants={fadeUp}>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1A1A1A] md:text-3xl">
              Nuestra ubicación
            </h2>
            <p className="mt-2 text-[#5C5C5C]">
              Visítanos en nuestra tienda en San Pedro Sula.
            </p>

            <div className="mt-8 overflow-hidden rounded-xl border border-[#E5E0D5] shadow-sm">
              <iframe
                title="Ubicación de Comercial del Valle"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.2!2d-88.0318!3d15.4946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSan+Pedro+Sula!5e0!3m2!1ses!2shn!4v1700000000000"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>

            <div className="mt-5 rounded-xl border border-[#E5E0D5] bg-white p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C75B39]" />
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">
                    Comercial del Valle
                  </p>
                  <p className="mt-0.5 text-sm text-[#5C5C5C]">
                    Barrio El Benque, 6ª Calle entre 10ª y 11ª Avenida SO
                  </p>
                  <p className="text-sm text-[#5C5C5C]">
                    San Pedro Sula, Honduras 22021
                  </p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Barrio+El+Benque+San+Pedro+Sula+Honduras"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#1B3A5C]/5 px-4 py-2.5 text-sm font-medium text-[#1B3A5C] transition-colors hover:bg-[#1B3A5C]/10"
              >
                <ExternalLink className="h-4 w-4" />
                Abrir en Google Maps
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SOCIAL MEDIA ─── */}
      <section className="bg-[#1B3A5C] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div
              variants={fadeUp}
              className="mx-auto mb-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#D4A843] to-[#E0BD6A]"
            />
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white md:text-4xl"
            >
              Síguenos en Redes Sociales
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-3 max-w-md text-white/70"
            >
              Mantente al día con las últimas telas, ofertas y novedades.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mt-12 grid gap-6 sm:grid-cols-3"
          >
            {/* Instagram */}
            <motion.a
              variants={fadeUp}
              href="https://instagram.com/comercialdelvallehn"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] text-white transition-transform group-hover:scale-110">
                <Instagram className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-lg font-semibold text-white">
                Instagram
              </h3>
              <p className="mt-1 text-sm text-white/60">
                @comercialdelvallehn
              </p>
              <p className="mt-3 text-sm text-[#D4A843]">
                Descubre nuestras telas en fotos y reels
              </p>
            </motion.a>

            {/* Facebook */}
            <motion.a
              variants={fadeUp}
              href="https://facebook.com/comercialdelvallehn"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform group-hover:scale-110">
                <Facebook className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-lg font-semibold text-white">
                Facebook
              </h3>
              <p className="mt-1 text-sm text-white/60">
                @comercialdelvallehn
              </p>
              <p className="mt-3 text-sm text-[#D4A843]">
                Ofertas exclusivas y novedades semanales
              </p>
            </motion.a>

            {/* TikTok */}
            <motion.a
              variants={fadeUp}
              href="https://tiktok.com/@comercialdelvallehn"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A1A1A] text-white transition-transform group-hover:scale-110">
                <TikTokIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-lg font-semibold text-white">
                TikTok
              </h3>
              <p className="mt-1 text-sm text-white/60">
                @comercialdelvallehn
              </p>
              <p className="mt-3 text-sm text-[#D4A843]">
                Videos de tendencias y tips de costura
              </p>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#D4A843] to-[#E0BD6A]"
          />
          <motion.h2
            variants={fadeUp}
            className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1A1A1A] md:text-4xl"
          >
            Preguntas Frecuentes
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-md text-[#5C5C5C]"
          >
            Encuentra respuestas a las preguntas más comunes sobre nuestros
            productos y servicios.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-[#E5E0D5]"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-[#1A1A1A] hover:text-[#1B3A5C] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-[#5C5C5C]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="border-t border-[#E5E0D5] bg-white py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl px-6 text-center"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1A1A1A] md:text-3xl">
            ¿Listo para encontrar tu tela ideal?
          </h2>
          <p className="mt-3 text-[#5C5C5C]">
            Escríbenos por WhatsApp y recibe atención personalizada al instante.
          </p>
          <a
            href="https://wa.me/50496518484"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-[#1DA851] hover:shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Chatear por WhatsApp
          </a>
        </motion.div>
      </section>
    </main>
  );
}
