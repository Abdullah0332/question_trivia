import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "../api";

function SignIn() {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please Enter Valid Email"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      loading: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      formik.setFieldValue("loading", true);
      let data = await signIn({ ...values, points: 0 });
      window.location = `/question?id=${data.data._id}`;
    },
  });

  return (
    <div className="h-full">
      <main className="mx-auto max-w-xl pb-10 lg:py-12 lg:px-8">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
            {formik.values.loading ? (
              <div className="text-center py-32 font-bold">Loading...</div>
            ) : (
              <form
                className="space-y-8 divide-y divide-gray-200"
                onSubmit={formik.handleSubmit}
              >
                <div className="space-y-8 divide-y divide-gray-200">
                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Sign In Form
                      </h3>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your Full Name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                        </div>
                        {formik.touched.name && formik.errors.name && (
                          <div className="error-text">{formik.errors.name}</div>
                        )}
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            placeholder="Enter your email"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                          <div className="error-text">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
