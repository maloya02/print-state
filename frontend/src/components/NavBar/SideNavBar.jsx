import React from 'react';

const SideNavBar = () => {
  return (
  <>
  <nav
       id="sidebarMenu"
       className="collapse d-lg-block sidebar collapse"
       >
    <div>
      <div className="list-group list-group-flush mx-3 mt-4 bg-none">
        <a
           href="#"
           className="list-group-item list-group-item-action py-2 ripple"
           aria-current="true"
           >
          <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            
            <h4>Categories</h4>
        </a>
        <a
           href="#"
           className="list-group-item list-group-item-action py-2 ripple"
           >
          <i className="fas fa-chart-area fa-fw me-3"></i>
            <span>Men</span>
        </a>
        <a
           href="#"
           className="list-group-item list-group-item-action py-2 ripple"
           ><i className="fas fa-lock fa-fw me-3"></i><span>Women</span>
        </a>
        <a
           href="#"
           className="list-group-item list-group-item-action py-2 ripple"
           ><i className="fas fa-chart-line fa-fw me-3"></i>
           <span>Kids</span></a>
        <a
           href="#"
           className="list-group-item list-group-item-action py-2 ripple"
           >
          <i className="fas fa-chart-pie fa-fw me-3"></i><span>Babies</span>
        </a>



        <a
           href="#"
           className="list-group-item list-group-item-action py-2 ripple"
           aria-current="true"
           >
          <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            
            <h4>Products</h4>
        </a>
        <a
           href="#"
           className="list-group-item list-group-item-action py-2 ripple"
           >
          <i className="fas fa-chart-area fa-fw me-3"></i>
            <span>Hoodies & Jackets</span>
        </a>
        <a
           href="#"
           className="list-group-item list-group-item-action py-2 ripple"
           ><i className="fas fa-lock fa-fw me-3"></i><span>Long-Sleeved Shirts</span>
        </a>
        <a
           href="#"
           className="list-group-item list-group-item-action py-2 ripple"
           >
          <i className="fas fa-chart-pie fa-fw me-3"></i><span>Baby Tshirts</span>
        </a>
        <a
           href="#"
           className="list-group-item list-group-item-action py-2 ripple"
           >
          <i className="fas fa-chart-pie fa-fw me-3"></i><span>Baby One Pieces</span>
        </a>
       
      </div>
    </div>
  </nav>
  
  </>
  )
}

export default SideNavBar