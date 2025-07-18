import React from 'react'
import { Input, Select } from '../index'

export default function PageOne({ register, errors }) {
    return (
        <div>
            <div className='flex flex-col md:flex-row gap-3 mt-5'>
                <Input
                    label="First Name*"
                    type="text"
                    placeholder="Enter your first name"
                    {...register("firstName", {
                        required: true
                    })}
                    error={errors.firstName && "First name is required"}
                />

                <Input
                    label="Middle Name*"
                    type="text"
                    placeholder="Enter your middle name"
                    {...register("middleName", {
                        required: true
                    })}
                    error={errors.middleName && "Middle name is required"}
                />
                <Input
                    label="Last Name*"
                    type="text"
                    placeholder="Enter your last name"
                    {...register("lastName", {
                        required: true
                    })}
                    error={errors.lastName && "Last name is required"}
                />
            </div>
            <div className='flex flex-col md:flex-row gap-3 mt-5'>
                <Input
                    label="Date of Birth*"
                    type="date"
                    placeholder="Enter your date of birth"
                    {...register("dob", {
                        required: true
                    })}
                    error={errors.dob && "Date of birth is required"}
                />
                <Select
                    label="Gender*"
                    option={["Male", "Female", "Other"]}
                    {...register("gender", {
                        required: true
                    })}
                    error={errors.gender && "Gender is required"}
                />
                <Select
                    label="Marriage Status*"
                    option={["Yes", "No"]}
                    {...register("marriageStatus", {
                        required: true
                    })}
                    error={errors.marriageStatus && "Marriage Status is required"}
                />
                <Select
                    label="Gotra*"
                    option={[
                        "Aglecha",
                        "Bhaayl",
                        "Bhumbhaadiya",
                        "Chavndia",
                        "Chohan",
                        "Deoda",
                        "Gehlot",
                        "Hombad",
                        "Kaag",
                        "Khandala",
                        "Lacheta",
                        "Mogrecha",
                        "Muleva",
                        "Panwar",
                        "Parihar",
                        "Parihariya",
                        "Rathod",
                        "Saaptra",
                        "Sencha",
                        "Sepata",
                        "Sindra",
                        "Solanki",
                        "Soyal",
                        "Varpha"
                    ]}
                    {...register("gotra", {
                        required: true
                    })}
                    error={errors.gotra && "Gotra is required"}
                />
            </div>
            <div className='mt-4'>
                <p className='text-gray-400'>Native place details:</p>
                <div className='mt-3'>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <Input
                            label="Name of Village*"
                            type="text"
                            {...register("village")}
                        />
                        <Input
                            label="Pincode*"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            pattern="[0-9]*"
                            placeholder="Enter your pincode"
                            className="remove-arrow-input"
                            {...register("pincod", {
                                required: "Pincode is required",
                                validate: (value) =>
                                    /^[0-9]{6}$/.test(value) || "Pincode must be 6 digits",
                            })}
                            onInput={(e) => {
                                // Allow only 6 digits
                                const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-digits
                                e.target.value = rawValue.slice(0, 6); // Limit to 6 digits
                            }}
                        />

                        <Input
                            label="Taluka*"
                            type="text"
                            {...register("taluka")}
                        />
                    </div>
                    <div className='mt-3 flex flex-col md:flex-row gap-3'>
                        <Input
                            label="District*"
                            type="text"
                            {...register("district")}
                        />
                        <Select
                            label="States*"
                            defaultValue="Rajasthan"
                            option={[
                                "Andhra Pradesh",
                                "Arunachal Pradesh",
                                "Assam",
                                "Bihar",
                                "Chhattisgarh",
                                "Goa",
                                "Gujarat",
                                "Haryana",
                                "Himachal Pradesh",
                                "Jharkhand",
                                "Karnataka",
                                "Kerala",
                                "Madhya Pradesh",
                                "Maharashtra",
                                "Manipur",
                                "Meghalaya",
                                "Mizoram",
                                "Nagaland",
                                "Odisha",
                                "Punjab",
                                "Rajasthan",
                                "Sikkim",
                                "Tamil Nadu",
                                "Telangana",
                                "Tripura",
                                "Uttar Pradesh",
                                "Uttarakhand",
                                "West Bengal"
                            ]}
                            {...register("states")}
                        />
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <p className='text-gray-400'>Current Home Address:</p>
                <div className='mt-3'>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <Input
                            label="Street 1*"
                            type="text"
                            placeholder="Enter Street 1*"
                            {...register("streetOne", {
                                required: true
                            })}
                            error={errors.streetOne && "Street 1 is required"}
                        />
                        <Input
                            label="Street 2*"
                            type="text"
                            placeholder="Enter Street 2*"
                            {...register("streetTwo", {
                                required: true
                            })}
                            error={errors.streetTwo && "Street 2 is required"}
                        />
                    </div>
                    <div className='mt-3 flex flex-col md:flex-row gap-3'>
                        <Input
                            label="City*"
                            type="text"
                            placeholder="City*"
                            {...register("city", {
                                required: true
                            })}
                            error={errors.city && "City is required"}
                        />
                        <Input
                            label="Pincode*"
                            type="number"
                            placeholder="Enter your pincode"
                            className="remove-arrow-input"
                            {...register("pincods", {

                                maxLength: 6,
                                minLength: 6,
                                validate: (value) => value.length === 6 || "Pincode must be 6 digits"
                            })}
                            onInput={(e) => {
                                e.target.value = e.target.value.slice(0, 6);
                                if (e.target.value.length === 6) {
                                    e.target.blur();
                                }
                            }}
                        />
                        <Select
                            label="State*"
                            defaultValue="Gujarat"
                            option={[
                                "Andhra Pradesh",
                                "Arunachal Pradesh",
                                "Assam",
                                "Bihar",
                                "Chhattisgarh",
                                "Goa",
                                "Gujarat",
                                "Haryana",
                                "Himachal Pradesh",
                                "Jharkhand",
                                "Karnataka",
                                "Kerala",
                                "Madhya Pradesh",
                                "Maharashtra",
                                "Manipur",
                                "Meghalaya",
                                "Mizoram",
                                "Nagaland",
                                "Odisha",
                                "Punjab",
                                "Rajasthan",
                                "Sikkim",
                                "Tamil Nadu",
                                "Telangana",
                                "Tripura",
                                "Uttar Pradesh",
                                "Uttarakhand",
                                "West Bengal"
                            ]}
                            {...register("state")}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
