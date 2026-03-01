"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      className="h-8 w-8 text-[#D4A843]"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.73-3.555"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      className="h-8 w-8 text-[#D4A843]"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      className="h-8 w-8 text-[#D4A843]"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      className="h-6 w-6 text-[#D4A843]"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats data                                                         */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "119+", label: "Rese\u00f1as con 4.6 Estrellas" },
  { value: "500+", label: "Tipos de Telas" },
  { value: "Miles", label: "de Clientes Satisfechos" },
  { value: "A\u00f1os", label: "Sirviendo a Honduras" },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center overflow-hidden bg-[#1B3A5C] py-24 md:py-36">
        <Image
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600&h=700&fit=crop"
          alt="Telas en Comercial del Valle"
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Nuestra Historia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            Conoce a Comercial del Valle
          </motion.p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
              alt="Interior de Comercial del Valle"
              fill
              className="object-cover"
            />
            {/* Decorative gold corner */}
            <div className="absolute -bottom-3 -right-3 h-24 w-24 rounded-br-2xl border-b-4 border-r-4 border-[#D4A843]" />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.15}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#D4A843]">
              Quiénes Somos
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              Una Tradici&oacute;n Textil en San Pedro Sula
            </h2>

            <p className="mt-6 leading-relaxed text-gray-600">
              Comercial del Valle naci&oacute; como un peque&ntilde;o negocio familiar en el
              coraz&oacute;n de Barrio El Benque, San Pedro Sula. Desde sus humildes
              inicios, la tienda se fund&oacute; con una visi&oacute;n clara: ofrecer a los
              hondure&ntilde;os telas de calidad a precios accesibles, acompa&ntilde;ados de
              un servicio c&aacute;lido y personalizado.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Con el paso de los a&ntilde;os, Comercial del Valle ha crecido hasta
              convertirse en una de las tiendas de telas m&aacute;s confiables y
              reconocidas de la regi&oacute;n. Nuestro cat&aacute;logo se ha expandido para
              incluir m&aacute;s de 500 tipos de telas &mdash; desde algodones y linos
              cl&aacute;sicos hasta materiales t&eacute;cnicos deportivos e impermeables
              &mdash; siempre manteniendo el compromiso con la calidad que nos
              distingue.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Lo que nos impulsa cada d&iacute;a son los valores familiares con los que
              fuimos fundados: honestidad, dedicaci&oacute;n y un profundo amor por
              nuestra comunidad sampedrense. Cada cliente que entra por nuestras
              puertas se convierte en parte de la familia Comercial del Valle, y
              eso es algo que ning&uacute;n crecimiento podr&aacute; cambiar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission / Vision / Values ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            className="text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#D4A843]">
              Lo Que Nos Define
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              Misi&oacute;n, Visi&oacute;n y Valores
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {/* Mision */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              className="rounded-2xl border border-gray-100 bg-[#FAFAF7] p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1B3A5C]/10">
                <TargetIcon />
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A]">
                Misi&oacute;n
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                Ofrecer la mejor selecci&oacute;n de telas con calidad y precios
                accesibles para cada proyecto. Buscamos que cada cliente encuentre
                exactamente lo que necesita, con asesor&iacute;a experta y un servicio
                que supere sus expectativas.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.15}
              className="rounded-2xl border border-gray-100 bg-[#FAFAF7] p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1B3A5C]/10">
                <EyeIcon />
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A]">
                Visi&oacute;n
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                Ser la tienda de telas l&iacute;der en Honduras, reconocida por su
                variedad y servicio excepcional. Aspiramos a ser el primer lugar
                en el que piensen los hondure&ntilde;os cuando necesiten telas para
                cualquier proyecto.
              </p>
            </motion.div>

            {/* Valores */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.3}
              className="rounded-2xl border border-gray-100 bg-[#FAFAF7] p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1B3A5C]/10">
                <HeartIcon />
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A]">
                Valores
              </h3>
              <ul className="mt-3 space-y-2 leading-relaxed text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4A843]" />
                  Honestidad
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4A843]" />
                  Calidad
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4A843]" />
                  Servicio al Cliente
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4A843]" />
                  Compromiso con Honduras
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Numbers / Stats ── */}
      <section className="bg-[#1B3A5C] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i * 0.1}
                className="text-center"
              >
                <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#D4A843] md:text-5xl">
                  {stat.value}
                </span>
                <p className="mt-2 text-sm text-white/80 md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#D4A843]">
              Nuestro Equipo
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              Expertos en Telas a Tu Servicio
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              Detr&aacute;s de Comercial del Valle hay un equipo apasionado y dedicado
              que trabaja todos los d&iacute;as para brindarte la mejor experiencia.
              Nuestro personal conoce cada tela, cada textura y cada uso posible,
              y est&aacute; listo para asesorarte.
            </p>
            <p className="mt-4 text-lg font-medium text-[#1B3A5C]">
              Cada miembro de nuestro equipo est&aacute; capacitado para ayudarte a
              encontrar la tela perfecta para tu proyecto.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Ya sea que est&eacute;s buscando la tela ideal para un vestido de novia,
              uniformes escolares, tapizado de muebles o un proyecto deportivo,
              nuestro equipo te guiar&aacute; con paciencia y conocimiento para que
              tomes la mejor decisi&oacute;n.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.15}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop"
              alt="Nuestro equipo de trabajo"
              fill
              className="object-cover"
            />
            <div className="absolute -bottom-3 -left-3 h-24 w-24 rounded-bl-2xl border-b-4 border-l-4 border-[#D4A843]" />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-[#1B3A5C] to-[#0f2440] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white md:text-4xl">
              &iquest;Listo para Visitarnos?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Te esperamos en nuestra tienda para que conozcas de primera mano la
              calidad y variedad de telas que tenemos para ti.
            </p>

            {/* Address */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white/10 px-6 py-4 backdrop-blur-sm">
              <MapPinIcon />
              <div className="text-left">
                <p className="font-semibold text-white">Comercial del Valle</p>
                <p className="text-sm text-white/70">
                  Barrio El Benque, San Pedro Sula, Honduras
                </p>
              </div>
            </div>

            {/* WhatsApp button */}
            <div className="mt-8">
              <a
                href="https://wa.me/50496518484?text=Hola,%20me%20gustar%C3%ADa%20visitarlos.%20%C2%BFCu%C3%A1l%20es%20su%20horario?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-105"
              >
                <WhatsAppIcon className="h-6 w-6" />
                Escr&iacute;benos por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
