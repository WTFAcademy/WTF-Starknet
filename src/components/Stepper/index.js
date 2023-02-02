import React, {useMemo} from "react";

export const StepperContext = React.createContext(null);

// 仅支持在TailwindWrapper包裹的页面中使用
const Stepper = (props) => {
    const {children, activeStep} = props;

    const contextValue = useMemo(
        () => ({ activeStep }),
        [activeStep],
    );

    const childrenArray = React.Children.toArray(children).filter(Boolean);
    const steps = childrenArray.map((step, index) => {
        return React.cloneElement(step, {
            index,
            first: index === 0,
            last: index + 1 === childrenArray.length,
            ...step.props,
        });
    });

    return (
        <StepperContext.Provider value={contextValue}>
            <div className="flex flex-col">
                {steps}
            </div>
        </StepperContext.Provider>
    )
}

export default Stepper;