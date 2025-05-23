import { Sheet } from 'react-modal-sheet';
import React, { useState } from 'react';
import { Button } from "framework7-react";
import "../css/DragSheet.css";

const DragSheetMobile = ({ isOpen, setOpen, routeInfo }) => {
  const [activeTab, setActiveTab] = useState('route'); // 'route' oder 'info'

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
      <Sheet.Container style={{ height: '50vh' }}>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller>
            <div style={{ padding: '10px' }}>
              
              {/* Buttons nebeneinander */}
              <div className='ButtonWrapper'>
                <Button onClick={() => setActiveTab('route')} className='RouteButton'>
                  Routeinfo anzeigen
                </Button>
                <Button onClick={() => setActiveTab('info')} className='InfoButton'>
                  Info anzeigen
                </Button>
              </div>

              {/* Inhalt unter den Buttons */}
              <div className="TextContent">
                {activeTab === 'route' ? (
                  routeInfo ? (
                    <p style={{ fontWeight: 'bold', fontSize: 22 }}>
                      Distanz: {routeInfo.distance} km, Zeit: {routeInfo.duration} min
                      <br />
                      Koordinaten: {routeInfo.destination}
                    </p>
                  ) : (
                    <p>Bitte auf Karte klicken…</p>
                  )
                ) : (
                  <p style={{ fontSize: 18 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                )}
              </div>
              <div
                id="leaflet-routing-wrapper"
                style={{
                  borderRight: '1px solid #ccc',
                  padding: '10px',
                  overflowY: 'auto',
                  display: activeTab === 'route' ? 'block' : 'none',
                  minWidth: '100vw'
                }}
              />
            </div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default DragSheetMobile;
