/** @jsxImportSource theme-ui */
import { Button, Container, Grid, jsx, Label, Text } from 'theme-ui'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextAreaInput from '../../components/TextAreaInput'


export interface Values {
    title: string,
    // artist: string,
    // venueId: string,
    // status: number,
    // price: number,
    // id: string,
    // phone: string,
    // type: string,
    // description: string,
    // website: string,
    // facebook: string,
    // twitter: string,
    // instagram: string,
    // imageUrl?: string,
    // dates: string[],
    // tagsId?: string[],
    // time?: string
}

const handleSubmit = async (
    values: Values,
    // { setSubmitting }: FormikHelpers<Values>,
) => {
    console.log("sent!")
}

const CreateEventSchema = Yup.object().shape({
    title: Yup.string()
        .min(1, 'At least one character')
        .max(26, 'Can\'t be longer that 26 char ')
        .required('Capacity field is required'),

})
function CreateEvent(): JSX.Element {

    const initialValues: Values = {
        title: ''
        // artist: '',
        // venueId: '',
        // status: 0,
        // price: 0,
        // id: '',
        // phone: '',
        // type: '',
        // description: '',
        // website: '',
        // facebook: '',
        // twitter: '',
        // instagram: '',
        // imageUrl: '',
        // dates: [''],
        // tagsId: [''],
        // time: ''
    }

    return (
        <div >
            <Text>Crea un nuevo evento!</Text>
            <Button>ola</Button>
            <Formik
                initialValues={initialValues}
                validationSchema={CreateEventSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Container>
                                <Text variant="title">Titulo we </Text>
                                <TextAreaInput
                                    name="title"
                                    label=""
                                    placeholder="Titulo del event"
                                    type="text"
                                />
                            </Container>
                            <Container
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <Button
                                    sx={{ marginLeft: '8px' }}
                                    type="submit"

                                >
                                    Create
                                </Button>
                            </Container>
                        </Form>
                    )
                }
            </Formik>
        </div >
    )
}
export default CreateEvent
