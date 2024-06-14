import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from './Loader';

const today = new Date();
const date18YearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.date()
        .required('Date of Birth is required')
        .test('dob', 'You must be at least 18 years old', function (value) {
            const { maritalStatus } = this.parent;
            return maritalStatus !== 'married' || (value && value <= date18YearsAgo);
        }),
    maritalStatus: Yup.string().required('Marital Status is required'),
    spouseName: Yup.string()
        .test('spouseName', 'Spouse Name is required', function (value) {
            const { maritalStatus } = this.parent;
            return maritalStatus !== 'married' || (value && value !== '');
        }),
    spouseDob: Yup.date()
        .test('spouseDob', 'You must be at least 18 years old', function (value) {
            const { maritalStatus } = this.parent;
            return maritalStatus !== 'married' || (value && value <= date18YearsAgo);
        }),
});
const todayStr = today.toISOString().split('T')[0];
const FormValidation = () => {

    const initialValues = {
        name: '',
        gender: '',
        dob: '',
        maritalStatus: '',
        spouseName: '',
        spouseDob: ''
    };
    const onSubmit = (values, { resetForm, setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
            alert('Form submitted!');
            setSubmitting(false);
            resetForm();
        }, 2000);
    };
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, errors, touched, isSubmitting }) => (
                <Form className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group mb-2">
                            <label htmlFor="name">Name</label>
                            <Field id="name" name="name" type="text" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group mb-2">
                            <label htmlFor="dob">Date of Birth</label>
                            <Field id="dob" name="dob" type="date" className={`form-control ${errors.dob && touched.dob ? 'is-invalid' : ''}`} max={todayStr} />
                            <ErrorMessage name="dob" component="div" className="text-danger" />
                        </div>

                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group mb-2">
                            <label>Gender</label>
                            <div className={`form-control d-flex gap-3  ${errors.gender && touched.gender ? 'is-invalid' : ''}`}>
                                <div>
                                    <Field id="male" name="gender" type="radio" value="male" className="form-check-input" />{" "}
                                    <label htmlFor="male" className="form-check-label">Male</label>
                                </div>
                                <div>
                                    <Field id="female" name="gender" type="radio" value="female" className="form-check-input" />{" "}
                                    <label htmlFor="female" className="form-check-label"> Female</label>
                                </div>
                            </div>
                            <ErrorMessage name="gender" component="div" className="text-danger" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group mb-2">
                            <label>Marital Status</label>
                            <div className={`form-control d-flex gap-3  ${errors.maritalStatus && touched.maritalStatus ? 'is-invalid' : ''}`}>
                                <div>
                                    <Field id="single" name="maritalStatus" type="radio" value="single" className="form-check-input" />{" "}
                                    <label htmlFor="single" className="form-check-label">Single</label>
                                </div>
                                <div>
                                    <Field id="married" name="maritalStatus" type="radio" value="married" className="form-check-input" />{" "}
                                    <label htmlFor="married" className="form-check-label">Married</label>
                                </div>
                            </div>
                            <ErrorMessage name="maritalStatus" component="div" className="text-danger" />
                        </div>
                    </div>

                    {values.maritalStatus === 'married' && (
                        <>
                            <div className="col-12 col-md-6">
                                <div className="form-group mb-2">
                                    <label htmlFor="spouseName">Spouse's Name</label>
                                    <Field id="spouseName" name="spouseName" type="text" className={`form-control ${errors.spouseName && touched.spouseName ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="spouseName" component="div" className="text-danger" />
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="form-group mb-2">
                                    <label htmlFor="spouseDob">Spouse's Date of Birth</label>
                                    <Field id="spouseDob" name="spouseDob" type="date" className={`form-control ${errors.spouseDob && touched.spouseDob ? 'is-invalid' : ''}`} max={todayStr} />
                                    <ErrorMessage name="spouseDob" component="div" className="text-danger" />
                                </div>
                            </div>
                        </>
                    )}

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? <Loader height='30' width='30' color='#fff' /> : "Submit"}

                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default FormValidation
