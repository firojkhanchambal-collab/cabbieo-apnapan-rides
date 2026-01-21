import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Seat {
  id: string;
  seat_number: string;
  seat_type: "window" | "middle" | "aisle" | "driver";
  seat_row: number;
  seat_col: number;
  price: number;
  status: "available" | "booked" | "blocked" | "selected";
  is_blocked: boolean;
}

interface SeatMapProps {
  seats: Seat[];
  selectedSeats: string[];
  onSeatSelect: (seatId: string, seat: Seat) => void;
  isWomenOnly?: boolean;
  vehicleType: "sedan" | "premium_suv" | "tempo_traveller";
}

const SeatMap = ({ seats, selectedSeats, onSeatSelect, isWomenOnly: _isWomenOnly, vehicleType: _vehicleType }: SeatMapProps) => {
  const [groupedSeats, setGroupedSeats] = useState<Map<number, Seat[]>>(new Map());

  useEffect(() => {
    const grouped = new Map<number, Seat[]>();
    seats.forEach((seat) => {
      const row = seat.seat_row;
      if (!grouped.has(row)) {
        grouped.set(row, []);
      }
      grouped.get(row)!.push(seat);
    });
    
    // Sort seats within each row by column
    grouped.forEach((rowSeats, row) => {
      grouped.set(row, rowSeats.sort((a, b) => a.seat_col - b.seat_col));
    });
    
    setGroupedSeats(grouped);
  }, [seats]);

  const getSeatColor = (seat: Seat) => {
    if (seat.seat_type === "driver") return "bg-muted text-muted-foreground cursor-not-allowed";
    if (seat.is_blocked || seat.status === "blocked") return "bg-muted text-muted-foreground cursor-not-allowed";
    if (seat.status === "booked") return "bg-destructive/80 text-destructive-foreground cursor-not-allowed";
    if (selectedSeats.includes(seat.id)) return "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2";
    if (seat.seat_type === "window") return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer border-emerald-300";
    if (seat.seat_type === "middle") return "bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer border-amber-300";
    return "bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer border-blue-300";
  };

  const canSelectSeat = (seat: Seat) => {
    return seat.seat_type !== "driver" && 
           !seat.is_blocked && 
           seat.status === "available";
  };

  const handleSeatClick = (seat: Seat) => {
    if (canSelectSeat(seat)) {
      onSeatSelect(seat.id, seat);
    }
  };

  const sortedRows = Array.from(groupedSeats.keys()).sort((a, b) => a - b);

  // Get max columns for grid layout
  const maxCols = Math.max(...seats.map(s => s.seat_col), 0) + 1;

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center text-xs mb-4">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300" />
          <span>Window (Premium)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300" />
          <span>Middle (Discount)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300" />
          <span>Aisle</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-primary" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-destructive/80" />
          <span>Booked</span>
        </div>
      </div>

      {/* Vehicle Visual */}
      <div className="relative mx-auto max-w-sm">
        {/* Vehicle Frame */}
        <div className="bg-muted/30 rounded-t-3xl rounded-b-xl border-2 border-muted p-4 space-y-2">
          {/* Front of vehicle */}
          <div className="text-center text-xs text-muted-foreground mb-2 pb-2 border-b border-dashed">
            🚗 Front
          </div>

          {/* Seat Grid */}
          <div className="space-y-2">
            {sortedRows.map((rowNum) => {
              const rowSeats = groupedSeats.get(rowNum) || [];
              return (
                <div 
                  key={rowNum} 
                  className="flex justify-center gap-2"
                  style={{ 
                    gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))` 
                  }}
                >
                  {rowSeats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={!canSelectSeat(seat)}
                      className={cn(
                        "w-12 h-12 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 font-medium text-xs",
                        getSeatColor(seat),
                        canSelectSeat(seat) && "hover:scale-105 active:scale-95"
                      )}
                      title={`Seat ${seat.seat_number} - ₹${seat.price} (${seat.seat_type})`}
                    >
                      <span className="font-bold">{seat.seat_number}</span>
                      {seat.seat_type === "driver" ? (
                        <span className="text-[10px]">Driver</span>
                      ) : seat.status !== "booked" && (
                        <span className="text-[10px]">₹{seat.price}</span>
                      )}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Back of vehicle */}
          <div className="text-center text-xs text-muted-foreground mt-2 pt-2 border-t border-dashed">
            Back
          </div>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-primary/10 rounded-lg p-3 text-center">
          <p className="text-sm font-medium">
            Selected: {selectedSeats.length} seat(s)
          </p>
          <div className="flex flex-wrap gap-1 justify-center mt-2">
            {selectedSeats.map((seatId) => {
              const seat = seats.find(s => s.id === seatId);
              return seat ? (
                <Badge key={seatId} variant="secondary">
                  {seat.seat_number} - ₹{seat.price}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
