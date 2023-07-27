import React, { useState, useEffect } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBTypography,
} from 'mdb-react-ui-kit';
import AdminDashboard from './AdminDashboard';
import DashboardContent from './DashboardContent';
import AccountDashBoard from './AccountDashBoard';
import AccountAdd from './AccountAdd';





const SideMenu = () => {
  const [verticalActive, setVerticalActive] = useState('tab1');

  useEffect(() => {
    // Check if there's a stored active tab value in localStorage
    const storedActiveTab = localStorage.getItem('activeTab');
    if (storedActiveTab && (storedActiveTab === 'tab1' || storedActiveTab === 'tab2')) {
      setVerticalActive(storedActiveTab);
    }
  }, []);

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);

    // Store the active tab value in localStorage
    localStorage.setItem('activeTab', value);
  };

  return (
    <MDBRow>
      <MDBCol md={2} sm={2} className='bg-white min-vh-100 pt-5'>
        <MDBTabs className='flex-column text-center p-4'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
              Products
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
             Users
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
      </MDBCol>
   
      <MDBCol md={10} sm={10} style={{background: "#e9e9e9"}}>
        <MDBContainer className='bg-white m-5 p-5 rounded-5'>
        <MDBTabsContent>
          <MDBTabsPane show={verticalActive === 'tab1'}>
            <DashboardContent/> 
            </MDBTabsPane>
          <MDBTabsPane show={verticalActive === 'tab2'}> 
            <AccountDashBoard/> 
          </MDBTabsPane>
        </MDBTabsContent>
        </MDBContainer>
       
      </MDBCol>
    </MDBRow>

  );
};

export default SideMenu;