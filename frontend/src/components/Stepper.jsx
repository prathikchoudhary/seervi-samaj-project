import React,{useState} from 'react'
import { Button,PageOne } from './index'
import { message, Steps } from 'antd';
import { useForm } from 'react-hook-form';
export default function Stepper() {
    const { register, handleSubmit, formState: { errors }, trigger } = useForm({mode: "onChange"});
    const steps = [
        {
            title: 'Personal Details',
            content: <PageOne register={register} errors={errors} />,
        },
        {
            title: 'Education & Professional Details',
            content: 'Second-content',
        },
        {
            title: 'Upload User Image',
            content: 'Last-content',
        },
    ];
    const [current, setCurrent] = useState(0);
    /**
     * Moves to the next step in the stepper
     */
    const next = async () => {
        if (current === 0) {
          const valid = await trigger(); // This will now work!
          if (!valid) return;
        }
        setCurrent(current + 1);
      };
    /**
     * Moves to the previous step in the stepper
     */

    const prev = () => {
        setCurrent(current - 1);
    };
    
    const items = steps.map(item => ({ key: item.title, title: item.title }));
    return (
        <div>
            <div>
                <Steps current={current} items={items} />
            </div>
            <div className="mt-4">{steps[current].content}</div>
            <div className="flex justify-end mt-5">
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={handleSubmit(() => message.success('Processing complete!'))}>
                        Done
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
            </div>
        </div>
    )
}
