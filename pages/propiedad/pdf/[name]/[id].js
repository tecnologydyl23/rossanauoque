import { baseUrl, fetchApi } from "../../../../utils/fetchApi";
import { useState } from 'react';

function GeneratePdf({ propertypdf }) {
    const [file, setFile] = useState(propertypdf);

    console.log(file)

    return (
        <>
        </>
    );
}



export async function getServerSideProps({ params: { id } }) {
    const data = await fetchApi(`${baseUrl}/property/make-pdf/${id}`)
    return {
        props: {
            propertypdf: data,
        },
    };
}


export default GeneratePdf;
