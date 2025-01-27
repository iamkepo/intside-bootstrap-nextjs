"use client";
import { modal, toast } from "@/stores/app.store";

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page</p>
      <div className="dropdown">
        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown link
        </a>

        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Action</a></li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <li><a className="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
      <div className="card" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <button 
        type="button" 
        onClick={() => modal.md(<h5 className="card-title">Special title treatment</h5>)}
        className="btn btn-primary"
      >
        open modal
      </button>
      <button 
        type="button" 
        onClick={() => toast.primary('Special title treatment')}
        className="btn btn-primary"
      >
        show toast
      </button>
    </main>
  );
}
