import { Sheet } from 'react-modal-sheet';

const DragSheet = ({ isOpen, setOpen, routeInfo }) => {
  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
      <Sheet.Container style={{ height: "25vh" }}>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller>
            {routeInfo ? (
              <p>
                Distanz: {routeInfo.distance} km, Zeit: {routeInfo.duration} min
                <br />
                Koordinaten: {routeInfo.destination}
              </p>
            ) : (
              <p>Bitte auf Karte klicken…</p>
            )}
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default DragSheet;
