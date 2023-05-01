
const Bars = ({sidebar}) => {
 

    return<>
    <div className={`bar-holder ${sidebar ? "active" : ""}`} > 
    <div className="bars bar1"></div>
    <div className="bars bar2"></div>
</div>
    </>
}

export default Bars;