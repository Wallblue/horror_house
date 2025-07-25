import Form from "./Form";
import { Field, Option } from "./FormField";

export interface BookingFormdata {
    name: string,
    email: string,
    session: string
};

interface BookingFormProps {
    formdata: BookingFormdata
    setFormdata: React.Dispatch<React.SetStateAction<BookingFormdata>>
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
};

const options : Option[] = [
    {value: '', text: '-- Choisissez une session --'},
    {value: 'Le Manoir Hanté', text: 'Le Manoir Hanté'},
    {value: 'L’Asile Abandonné', text: 'L’Asile Abandonné'},
    {value: 'La Crypte Maudite', text: 'La Crypte Maudite'},
];

export default function BookingForm({formdata, setFormdata, setSubmitted} : BookingFormProps) {
    const fields : Field[] = [
        {label: 'Nom', type: 'text', name: 'name', value: formdata.name},
        {label: 'Email', type: 'email', name: 'email', value: formdata.email},
        {label: 'Session', type: 'select', name: 'session', value: formdata.session, options: options},
    ];

    return (
        <Form<BookingFormdata>
            formdata={formdata}
            setFormdata={setFormdata}
            setSubmitted={setSubmitted}
            fields={fields}
            submitText="Réserver"
        />
    );
}