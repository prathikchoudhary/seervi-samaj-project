import { Input, Select } from '../index';
import { useFormContext } from 'react-hook-form';


export default function PageTwo() {
    const { setValue, watch, formState: { errors } } = useFormContext();
    const education = watch("education");
    const profession = watch("profession")
    const jobtype = watch("jobtype")
    const sector = watch("sector");

    return (
        <div>
            <div className='flex flex-row md:flex-row gap-3 mt-3.5'>
                <Select
                    name="education"
                    label="Education*"
                    placeholder="Select Education Level"
                    option={["Primary (1 - 5)", "Middle (6 - 8)", "Secondary (9 - 10)", "High Secondary (11 - 12)"]}
                    value={education}
                    onChange={(e) => setValue("education", e.target.value)}
                    error={errors.education?.message}
                />
                {education === "High Secondary (11 - 12)" && (
                    <Select
                        name="college"
                        label="College*"
                        placeholder="Select College Level"
                        option={["Bachelor's Degree", "College - Graduate", "College - Undergraduate"]}
                        error={errors.college?.message}
                    />
                )}
            </div>
            <div className='mt-3.5'>
                <Select
                    name="profession"
                    label="Profession*"
                    option={["Service", "Business"]}
                    error={errors.profession?.message}
                    value={profession}
                    onChange={(e) => setValue("profession", e.target.value)}
                />
                {profession == "Service" && (
                    <div className='mt-3.5'>
                        <Select
                            name="jobtype"
                            label="Type*"
                            placeholder="Select Job type"
                            option={["Private", "Government"]}
                            error={errors.jobtype?.message}
                        />
                        {jobtype == "Private" && (
                            <div className='mt-3.5'>
                                <Select
                                name="sector"
                                label="Sector*"
                                placeholder="Sector"
                                option={["Information Technology & ITES", "Financial Services & Banking (BFSI)", "Healthcare & Wellness", "Education & EdTech", "Tourism & Hospitality", "Private Banking", "Retail, FMCG & Consumer Goods", "Transport & Logistics", "Media & Entertainment", "Legal & Consultancy", "Environmental & Sustainability Services", "E-commerce & Digital Services", "AI / SaaS / Cloud", "Telecommunication", "Customer Support & BPO"]}
                                error={errors.sector?.message}
                                value={sector}
                                onChange={(e) => setValue("sector", e.target.value)}
                            />
                            </div>
                        )}
                        {jobtype == "Government" && (
                            <div className='mt-3.5'>
                                <Select
                                name="sector"
                                label="Secetor*"
                                placeholder="Sector"
                                option={["Banking", "Railways", "Defense & Aerospace", "PSU (Public Sector Units)", "Civil Services", "Government Healthcare", "Education & Research Institutes", "State & Central Government Departments", "Transport & Public Services", "Municipal Corporations"]}
                                error={errors.sector?.message}
                                value={sector}
                                onChange={(e) => setValue("sector", e.target.value)}
                            />
                            </div>
                        )}
                    </div>
                )}
                {profession == "Business" && (
                    <div className='mt-3.5'>
                        <div className='flex flex-col md:flex-row gap-3'>
                            <Input
                                name="companyName"
                                label="Company Name"
                                placeholder="Enter your Company Name"
                                error={errors.companyName?.message}
                            />
                            <Input
                                name="companyGstNo"
                                label="Company Gst No"
                                placeholder="Enter your Gst No"
                                error={errors.companyGstNo?.message}
                            />
                        </div>
                        <div className='mt-3'>
                            <div className='flex flex-col md:flex-row gap-3'>
                                <Input
                                    name="companystreetOne"
                                    label="Street 1*"
                                    type="text"
                                    placeholder="Enter Street 1*"
                                    error={errors.companystreetOne?.message}
                                />
                                <Input
                                    name="companystreetTwo"
                                    label="Street 2*"
                                    type="text"
                                    placeholder="Enter Street 2*"
                                    error={errors.companystreetTwo?.message}
                                />
                            </div>
                            <div className='mt-3 flex flex-col md:flex-row gap-3'>
                                <Input
                                    name="companyCity"
                                    label="City*"
                                    type="text"
                                    placeholder="City*"
                                    error={errors.companyCity?.message}
                                />
                                <Input
                                    name="companyPincode"
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
                                    error={errors.companyPincode?.message}
                                />
                                <Select
                                    name="Companystate"
                                    label="State*"
                                    defaultValue="Gujarat"
                                    option={["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]}
                                    error={errors.Companystate?.message}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
