import dynamic from 'next/dynamic'
import { baseUrl, fetchApi } from '../utils/fetchApi'
import Bibliography from '../components/Section/SectionBlibliographylite';
import Popup from '../components/Popup';

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

import Property from '../components/Property'
import { useState } from 'react';


export default function Home({ propertysAll, Banner, Categories }) {
  const [Categorie, setCategorie] = useState(null);

  return (
    <>

      <div className='player-wrapper max-h-full'>
        <ReactPlayer
          url={require('../public/videos/vd.webm')}
          autoPlay
          className='react-player'
          playing={true}
          width="100%"
          height="100%"
          muted
          loop
          style={{ objectFit: "cover" }}
          controls={false}
        />
      </div>
      <div className="bg-white lg:flex">
        <div className=" flex-1 mx-auto max-w-2xl py-16 px-4 sm:py-5  lg:max-w-7xl lg:px-8 lg:w-9/12">

         <h2>PROPIEDADES DESTACADAS</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {Object.entries(propertysAll).map((property) => (
              (property[0] === 'total' || property[0] === 'status') ? null :
                <Property property={property[1]} key={property[1].id_property} />
            ))}
          </div>
          
          DE TU INTERÉS
          Blog


        </div>
        <div className=' lg:w-3/12 lg:flex-none px-4'>
          <Bibliography/>
          <select>
            {
               Object.entries(Categories).map((property) => (
                <option key={property[1].nombre} value='1' >{property[1].nombre}</option>
              ))
            }
          </select>
        </div>
      </div>
      <Popup/>
    </>
  )
}

export async function getServerSideProps() {

    const propertysAll = await fetchApi(`${baseUrl}/property/search?&short=true`, '6');
    const propertysDest = await fetchApi(`${baseUrl}/property/highlighted?&short=true`, '2');
    const Categories = await fetchApi(`${baseUrl}/property-type/all?&quantity=true`);
    const Banner = await fetchApi(`${baseUrl}/banner/search`);
    return {
      props: {
        propertysAll: propertysAll,
        propertysDest: propertysDest,
        Categories: Categories,
        Banner: Banner,
      },
    };
  }




