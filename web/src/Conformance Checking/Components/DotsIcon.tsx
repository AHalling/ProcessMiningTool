

const Dots = () => {
    return(
        <div style={{left:"7vw", position:"absolute", top:"1.5vh"}}>
            {(() => {
            let td = [];
            for (let i = 1; i <= 4; i++) {
              td.push(                    
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16" key={i}>
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                </svg>);
            }
            return td;
          })()}
        </div>

    )
}

export default Dots;