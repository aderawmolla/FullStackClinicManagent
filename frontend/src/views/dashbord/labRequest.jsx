import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useState,useEffect} from 'react'
export default function LabRequest(props) { 
const prescriptions = useSelector((state) => state.prescriptions.prescriptions)
const patients=useSelector((state)=>state.patients.patients)
const doctors=useSelector((state)=>state.doctors.doctors)
const [prescriptionsWithNames, setPrescriptionWithNames] = useState([]);
const getPatientName=(patientId) =>{
const patient = patients.find((p) => p.id === patientId);
return patient ? `${patient.firstName} ${patient.lastName}`:'';};
const getDoctorName = (doctorId) =>{
    const doctor = doctors.find((d) => d.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}`:'';
        };
     useEffect(() => {
      const prescriptionWithNames = prescriptions.map((prescription) => ({
        ...prescription,
        doctorName:getDoctorName(prescription.doctorId),
        patientName:getPatientName(prescription.patientId),
      }));
      localStorage.setItem('prescriptionWithNames', JSON.stringify(prescriptionWithNames));
      const savedPrescriptions = JSON.parse(localStorage.getItem('prescriptionWithNames') || '[]');
      setPrescriptionWithNames(savedPrescriptions);  
      console.log("appointment with name is ", savedPrescriptions);
    },[]);

 return (
  <>
    <div className="mx-4 mt-4">
        <div className="flex flex-col items-end mb-10">
          <form className="flex items-center w-full">
            <label for="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search patients by thire name and card number "
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-primary rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5 mr-2 -ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              Search
            </button>
          </form>

          <div className="w-full rounded-lg shadow-xs">
          <h1 className="py-4 text-xl font-bold text-center text-gray-500">Issued Prescriptions</h1>
            <div className="w-full overflow-visible">
              <table className="w-full sm:w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">Patient Full Name</th>
                    <th className="px-4 py-3">Sender Doctor</th>
                    <th className="px-4 py-3">Issued Date</th>

                    {/* <th className="px-4 py-3">Test Detail</th> */}
                    <th className="px-4 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {prescriptionsWithNames && prescriptionsWithNames.map((prescription,index)=> prescription.status==="issued" && (
                    <tr className="text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-400">
                    <td className="px-4 py-3 ">
                      <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold">{prescription.patientName}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold">{prescription.doctorName}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm">{prescription.issueDate}</td>
                    {/* <td>
                      <div className="flex-shrink-0">
                        <a
                          href="/"
                          className="p-2 text-sm font-medium rounded-lg text-cyan-600 hover:bg-gray-100"
                        >
                          Test Detail
                        </a>
                      </div>
                    </td> */}
                   {/* <td className="px-4 py-3 text-sm">{prescription.confirmTime}</td> */}

                    <td className="px-2 py-3">
                      <div className="inline-flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <Link
                            to={`/lab/prescriptions/${prescription.id}`}
                            className="p-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-blue-700"
                          >
                            Send Lab result
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
              <span className="flex items-center col-span-3">
                {" "}
                Showing 21-30 of 100{" "}
              </span>
              <span className="col-span-2"></span>
              {/* <!-- Pagination --> */}
              <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ul className="inline-flex items-center">
                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Previous"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        1
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        2
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 text-white transition-colors duration-150 bg-blue-600 border border-r-0 border-blue-600 rounded-md dark:text-gray-800 dark:bg-gray-100 dark:border-gray-100 focus:outline-none focus:shadow-outline-purple">
                        3
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        4
                      </button>
                    </li>
                    <li>
                      <span className="px-3 py-1">...</span>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        8
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        9
                      </button>
                    </li>
                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Next"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </span>
            </div>
          </div>
          <div className="w-full py-8 rounded-lg shadow-xs">
          <h1 className="py-4 text-xl font-bold text-center text-gray-500">Confirmed Prescriptions</h1>
          <div className="w-full overflow-visible">
              <table className="w-full sm:w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">Patient Full Name</th>
                    <th className="px-4 py-3">Sender Doctor</th>
                    <th className="px-4 py-3">Issued Date</th>
                    <th className="px-4 py-3">Confirmation Date</th>
                    {/* <th className="px-4 py-3">Test Detail</th> */}
                    <th className="px-4 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {prescriptionsWithNames && prescriptionsWithNames.map((prescription, index) => prescription.status =="confirmed" && (
                    <tr className="text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-400">
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold">{prescription.patientName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold">{prescription.doctorName}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm">{prescription.issueDate}</td>
                   
                    <td className="px-4 py-3 text-sm">{prescription.confirmDate}</td>
                    {/* <td>
                      <div className="flex-shrink-0">
                        <a
                          href="/"
                          className="p-2 text-sm font-medium rounded-lg text-cyan-600 hover:bg-gray-100"
                        >
                          Test Detail
                        </a>
                      </div>
                    </td> */}
                    {/* <td className="px-2 py-3">
                      <div className="inline-flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <Link
                            to={`/lab/prescriptions/${prescription.id}`}
                            className="p-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-blue-700"
                          >                        
                          Send Lab result
                          </Link>
                        </div>
                      </div>
                    </td> */}
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
</>
  );
}
