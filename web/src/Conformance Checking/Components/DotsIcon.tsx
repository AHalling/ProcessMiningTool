

const Dots = () => {
  // TODO: Fix this mess
    return(
        <div style={{left:"4vw", position:"absolute", top:"4vh"}}>
            {(() => {
            let td = [];
            for (let i = 1; i <= 2; i++) {
              td.push(                    
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" fill="currentColor" className="bi bi-dot" viewBox="0 0 12 16" key={i}>
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                </svg>);
            }
            return td;
          })()}
        </div>

    )
}

export default Dots;