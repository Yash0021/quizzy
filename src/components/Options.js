import React from "react"

const Options = (props) => {

    function handleClick(event){
        props.onSelect(props.parentId, event.target.id)
    }

    const renderOptions = props.options.map((option, i) => {
        return <div
            id={option.id} 
            onClick={handleClick} 
            key={i} 
            className={"widget-font " + (option.selected ? 'selected' : "")}
            >{option.option}
        </div>
    })

    return <div className="options">
        {renderOptions}
    </div>
}

export default Options
