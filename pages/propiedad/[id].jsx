import { baseUrl, fetchApi } from "../../utils/fetchApi";
import parse from "html-react-parser";
import { BsXDiamondFill, BsXDiamond, BsFillEnvelopeFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import Characteristics from "../../components/characteristcs";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import { Popover, Transition } from "@headlessui/react";


const Carousel = dynamic(() => import('../../components/carrucel'), {
   loading: () => <div className="mb-1 w-full rounded-2xl h-72  bg-dorado-ph"></div>,
   ssr: false,
});

const ChangeView = dynamic(() => import('../../components/map'), {
   ssr: false,
});

function classNames(...classes) {
   return classes.filter(Boolean).join(" ");
}

const DetailProperty = ({ property }) => {


   const [open, setOpen] = useState(true)
   const [username, setUsernamen] = useState('')

   const handleDragStart = (e) => e.preventDefault();

   const filterGalerie = () => {
      let newGalerie = [];
      Object.entries(property.galleries[0]).map((a) => {
         a[1].url_original != undefined
            ? newGalerie.push(
               <img
                  alt={`imagen-inmueble-${a[1].id}`}
                  className="w-96 cursor-pointer pl-0.5"
                  src={a[1].url_original}
                  onDragStart={handleDragStart}
                  role="presentation"
               />
            )
            : null;
      });

      return newGalerie;
   };


   const submitContact = async (event) => {
      event.preventDefault();
      // setInputMail({
      //    name: `${event.target.name.value}`,
      //    mail: `${event.target.mail.value}`,
      //    tel: `${event.target.tel.value}`,
      //    mensage: `${event.target.mensage.value}`,
      // })
      const res = await fetch('/api/newUser', {
         body: JSON.stringify({
            name: event.target.name.value,
            mail: event.target.mail.value,
            tel: event.target.tel.value,
            mensage: event.target.mensage.value,
            property: property.id_property,
         }),
         headers: {

            'Content-Type': 'application/json',
         },
         method: 'POST',
      });
      const result = await res.json();

      if (result['msg'].status === "success") {
         setUsernamen(`${event.target.name.value}.`)
         setOpen(false)
      }
   };

   const recaptchaRef = React.createRef();


   const onReCAPTCHAChange = async (captchaCode) => {
      if (!captchaCode) {
         return;
      }
      // Else reCAPTCHA was executed successfully so proceed with the 
      // alert
      // alert(`Hey, ${email}`);
      // Reset the reCAPTCHA so that it can be executed again if user 
      // submits another email.
      recaptchaRef.current.reset();
   }



   return (
      <div className="bg-white">
         <div className="">
            {/* Image gallery */}

            <Carousel item={filterGalerie()} />
            {/* property info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-4 lg:pb-24">
               <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                     {property.title}
                  </h1>
                  <div className="grid  md:grid-cols-2 gap-4">
                     <div>
                        <div className=" text-4xl">
                           {property.rent_price > 0 ?
                              <>
                                 <span className="text-xs text-neutral-600">Precio de renta</span>
                                 <p className="font-black text-gray-500 uppercase mr-8">{property.rent_price_label} <span className="font-medium text-gray-500">/Mes</span></p>
                              </>
                              : property.sale_price > 0 ?
                                 <>
                                    <span className="text-xs text-neutral-600">Precio de venta</span>
                                    <p className="font-black text-gray-500 uppercase">{property.sale_price_label}</p>
                                 </>
                                 : null}

                        </div>
                        <span className="text-xs text-neutral-600">Pesos Colombianos</span>
                     </div>
                     <Image alt="boton de descarga" className="md:mt-6" width={201} height={55} src={'/images/Boton-descarga.png'} />
                  </div>
                  <div className="bg-white relative grid gap-3  px-5 py-6 sm:gap-6 sm:p-8 lg:grid-cols-3">
                     <Characteristics content={property.country_label} Icon={BsXDiamond} />
                     <Characteristics content={property.city_label} Icon={BsXDiamond} />
                     <Characteristics content={property.zone_label} Icon={BsXDiamond} />
                     <Characteristics content={property.availability_label} Icon={BsXDiamond} />
                     {property.maintenance_fee != 0 ? <Characteristics content={`$${property.maintenance_fee} Administración `} Icon={BsXDiamond} /> : false}
                     {property.built_area != 0 ? <Characteristics content={`${property.built_area} m² Área Construida`} Icon={BsXDiamond} /> : false}
                     {property.bathrooms != 0 ? <Characteristics content={`${property.bathrooms} Baños`} Icon={BsXDiamond} /> : null}
                     {property.bedrooms != 0 ? <Characteristics content={`${property.bedrooms} Habitaciones`} Icon={BsXDiamond} /> : null}
                     {property.garages != 0 ? <Characteristics content={`${property.garages} Garages`} Icon={BsXDiamond} /> : null}
                     {property.floor != 0 ? <Characteristics content={`${property.floor} Piso`} Icon={BsXDiamond} /> : null}
                     {property.floor != 0 ? <Characteristics content={`Año ${property.building_date}`} Icon={BsXDiamond} /> : null}
                  </div>
               </div>
               <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h1 className="text-center my-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                     Contáctanos
                  </h1>
                  <Link
                     className="group flex items-center justify-between rounded-lg border border-current px-5 py-3 text-dorado transition-colors  hover:bg-gradient-to-r hover:from-dorado hover:via-dorado-super-light hover:to-dorado  active:bg-dorado"
                     href="tel:3205178956"
                  >
                     <span className="flex font-medium transition-colors group-hover:text-white">
                        <FaPhoneAlt className="mr-4 mt-1" /> 3205178956
                     </span>

                     <span
                        className="ml-4 flex-shrink-0 rounded-full border border-dorado bg-white p-2 group-active:border-dorado"
                     >
                        <svg
                           className="h-5 w-5"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                           />
                        </svg>
                     </span>
                  </Link>
                  <Link
                     className="mt-4 group flex items-center justify-between rounded-lg border border-current px-5 py-3 text-dorado transition-colors  hover:bg-gradient-to-r hover:from-dorado hover:via-dorado-super-light hover:to-dorado active:bg-dorado"
                     href="mailto:luxury@rossanaulloque.com"
                  >
                     <span className="flex font-medium transition-colors group-hover:text-white">
                        <BsFillEnvelopeFill className="mr-4 mt-1" /> luxury@rossanaulloque.com
                     </span>

                     <span
                        className="ml-4 flex-shrink-0 rounded-full border border-dorado bg-white p-2 group-active:border-dorado"
                     >
                        <svg
                           className="h-5 w-5"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                           />
                        </svg>
                     </span>
                  </Link>
                  <div className={classNames(
                     open ? "visible" : "hidden",
                     ""
                  )}>
                     <h1 className="my-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                        ¿Prefieres que te contactemos?
                     </h1>
                     <form className="flex flex-col" onSubmit={submitContact}>
                        <ReCAPTCHA
                           ref={recaptchaRef}
                           size="invisible"
                           sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                           onChange={onReCAPTCHAChange}
                        />
                        <label>Tu nombre *</label>
                        <input id="name" name="name" type="text" className="form-input px-3 py-2 rounded-md" required />
                        <label className="mt-4">Correo electronico*</label>
                        <input id="mail" name="mail" type="email" className="form-input px-3 py-2 rounded-md" required />
                        <label className="mt-4">Celular*</label>
                        <input id="tel" name="tel" type="tel" className="form-input px-3 py-2 rounded-md" required />
                        <label className="mt-4">Mensaje</label>
                        <textarea id="mensage" name="mensage" rows="4" className="form-input px-3 py-2 rounded-md" />
                        <p>Al enviar tus datos <Link href={'/Docs/DataTreatment'} className="text-sm my-2 underline">aceptas recibir información sobre ofertas inmobiliarias</Link></p>
                        <button type="submit" className="px-4 py-2 font-bold text-white bg-gradient-to-r from-dorado via-dorado-super-light to-dorado rounded-md"
                        >
                           Enviar mensaje
                        </button>
                     </form>
                  </div>
                  <div className={classNames(
                     open ? "hidden" : "visible",
                     ""
                  )}>
                     <div className="flex flex-col items-start text-left mt-16">
                        <span className="mb-4 text-xs font-bold tracking-widest text-dorado uppercase">
                           Mensaje enviado correctamente </span>
                        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-3xl lg:text-4xl">
                           {username ? username : null} Gracias por confiar en nosotros</h1>
                        <p className="text-base leading-relaxed text-left text-gray-500">
                           Nos pondremos en contacto con usted lo antes posible.</p>
                     </div>
                  </div>
                  {/* <FormProperty /> */}
               </div>
               {/* Options */}
               <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                  {/* Description and details */}
                  <div className="">
                     <div className="space-y-4">
                        {property.features.internal.length > 0 ? (
                           <details
                              className="group [&_summary::-webkit-details-marker]:hidden"
                              open
                           >
                              <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50">
                                 <h2 className="font-medium text-gray-900">
                                    Características internas
                                 </h2>
                                 <svg
                                    className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M19 9l-7 7-7-7"
                                    />
                                 </svg>
                              </summary>
                              <div className="bg-white relative grid gap-3  px-5 py-6 sm:gap-6 sm:p-8 lg:grid-cols-3">
                                 {property.features.internal.map((item) => (
                                    <div
                                       key={item.id}
                                       className="-m-3 p-2 flex items-start rounded-lg"
                                    >
                                       <BsXDiamondFill className="mt-1 text-sm text-dorado" />
                                       <div className="ml-4">
                                          <p className="text-base font-normal text-gray-800">
                                             {item.nombre}
                                          </p>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </details>
                        ) : null}
                        {property.features.external.length > 0 ? (
                           <details
                              className="group [&_summary::-webkit-details-marker]:hidden"
                              open
                           >
                              <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50">
                                 <h2 className="font-medium text-gray-900">
                                    Características externas
                                 </h2>

                                 <svg
                                    className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M19 9l-7 7-7-7"
                                    />
                                 </svg>
                              </summary>

                              <div className="bg-white relative grid gap-3  px-5 py-6 sm:gap-6 sm:p-8 lg:grid-cols-3">
                                 {/* backdrop-blur-xl bg-white/70   */}
                                 {property.features.external.map((item) => (
                                    <div
                                       key={item.id}
                                       className="-m-3 p-2 flex items-start rounded-lg"
                                    >
                                       <BsXDiamond className="mt-1 text-sm text-dorado" />
                                       <div className="ml-4">
                                          <p className="text-base font-normal text-gray-800">
                                             {item.nombre}
                                          </p>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </details>
                        ) : null}

                        <details className="group [&_summary::-webkit-details-marker]:hidden" open>
                           <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50">
                              <h2 className="font-medium text-gray-900">
                                 Descripción Adicional
                              </h2>

                              <svg
                                 className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                 />
                              </svg>
                           </summary>
                           <div className="px-4 mt-4 leading-relaxed text-gray-700">
                              {parse(property.observations)}
                           </div>
                        </details>
                        {property.map ? <ChangeView latitude={property.latitude} longitude={property.longitude} /> : null}
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default DetailProperty;

export async function getServerSideProps({ params: { id } }) {
   const data = await fetchApi(`${baseUrl}/property/get/${id}`);
   return {
      props: {
         property: data,
      },
   };
}
