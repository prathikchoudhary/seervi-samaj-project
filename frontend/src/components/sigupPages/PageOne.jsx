import { Input, Select } from '../index'
import { useFormContext } from 'react-hook-form';

export default function PageOne() {
    const { formState: { errors } } = useFormContext();
    return (
        <div>
            <div className='flex flex-col md:flex-row gap-3 mt-5'>
                <Input
                    name="firstName"
                    label="First Name*"
                    type="text"
                    placeholder="Enter your first name"
                    error={errors.firstName?.message}
                />

                <Input
                    name="middleName"
                    label="Middle Name*"
                    type="text"
                    placeholder="Enter your middle name"
                    error={errors.middleName?.message}
                />
                <Input
                    name="lastName"
                    label="Last Name*"
                    type="text"
                    placeholder="Enter your last name"
                    error={errors.lastName?.message}
                />
            </div>
            <div className='flex flex-col md:flex-row gap-3 mt-5'>
                <Input
                    name="dob"
                    label="Date of Birth*"
                    type="date"
                    placeholder="Enter your date of birth"
                    error={errors.dob?.message}
                />
                <Select
                    name="gender"
                    label="Gender"
                    option={["Male", "Female", "Other"]}
                    error={errors.gender?.message}
                />
                <Select
                    name="marriageStatus"
                    label="Marriage Status*"
                    option={["Yes", "No"]}
                    error={errors.marriageStatus?.message}
                />
                <Select
                    name="gotra"
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
                    error={errors.gotra?.message}
                />
            </div>
            <div className='mt-4'>
                <p className='text-gray-400'>Native place details:</p>
                <div className='mt-3'>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <Input
                            name="village"
                            label="Name of Village*"
                            type="text"
                        />
                        <Input
                            name="villagePincode"
                            label="Pincode*"
                            type="number"
                            placeholder="Enter your pincode"
                            className="remove-arrow-input"
                            onInput={(e) => {
                                e.target.value = e.target.value.slice(0, 6);
                                if (e.target.value.length === 6) {
                                    e.target.blur();
                                }
                            }}
                            error={errors.villagePincode?.message}
                        />
                        <Input
                            name="taluka"
                            label="Taluka*"
                            type="text"
                        />
                    </div>
                    <div className='mt-3 flex flex-col md:flex-row gap-3'>
                        <Input
                            name="district"
                            label="District*"
                            type="text"
                        />
                        <Select
                            name="states"
                            label="States*"
                            defaultValue="Rajasthan"
                            option={["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]}
                            error={errors.states?.message}
                        />
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <p className='text-gray-400'>Current Home Address:</p>
                <div className='mt-3'>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <Input
                            name="streetOne"
                            label="Street 1*"
                            type="text"
                            placeholder="Enter Street 1*"
                            error={errors.streetOne?.message}
                        />
                        <Input
                            name="streetTwo"
                            label="Street 2*"
                            type="text"
                            placeholder="Enter Street 2*"
                            error={errors.streetTwo?.message}
                        />
                    </div>
                    <div className='mt-3 flex flex-col md:flex-row gap-3'>
                        <Input
                            name="city"
                            label="City*"
                            type="text"
                            placeholder="City*"
                            error={errors.city?.message}
                        />
                        <Input
                            name="currentPincode"
                            label="Pincode*"
                            type="number"
                            placeholder="Enter your pincode"
                            className="remove-arrow-input"
                            onInput={(e) => {
                                e.target.value = e.target.value.slice(0, 6);
                                if (e.target.value.length === 6) {
                                    e.target.blur();
                                }
                            }}
                            error={errors.currentPincode?.message}
                        />
                        <Select
                            name="state"
                            label="State*"
                            defaultValue="Gujarat"
                            option={["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]}
                            error={errors.state?.message}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
