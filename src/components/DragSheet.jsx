import { Sheet } from 'react-modal-sheet';
import React from 'react';
import { SearchWikipedia } from './WikipediaAPI';


const DragSheet = ({ isOpen, setOpen, routeInfo }) => {
  return (

    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
      <Sheet.Container style={{ height: "50vh" }}>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller>
            <div style={{ display: 'flex', height: '100%' }}>
              <div
                id="leaflet-routing-wrapper"
                style={{
                  flex: '1',
                  borderRight: '1px solid #ccc',
                  padding: '10px',
                  overflowY: 'auto',
                  minWidth: '250px',
                  maxWidth: '300px'
                }}
              >
              </div>
              <div style={{ flex: '3', padding: '10px', overflowY: 'auto' }}>
                {routeInfo ? (
                  <p style={{ fontWeight: 'bold', fontSize: 22 }}>
                    Distanz: {routeInfo.distance} km, Zeit: {routeInfo.duration} min
                    <br />
                    Koordinaten: {routeInfo.destination}
                  </p>
                ) : (
                  <p>Bitte auf Karte klicken…</p>
                )}

                <p style={{ fontWeight: 'bold', fontSize: 22 }}>Wikipedia</p>
                <SearchWikipedia/>
              </div>

            </div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default DragSheet;
