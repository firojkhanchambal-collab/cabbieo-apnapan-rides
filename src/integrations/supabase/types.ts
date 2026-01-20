export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          additional_notes: string | null
          advance_amount: number | null
          assigned_driver_id: string | null
          booking_date: string | null
          booking_time: string | null
          created_at: string
          distance_km: number | null
          drop_location: string
          estimated_fare: number | null
          id: string
          payment_status: string | null
          phone: string
          pickup_location: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          ride_type: string
          status: string | null
        }
        Insert: {
          additional_notes?: string | null
          advance_amount?: number | null
          assigned_driver_id?: string | null
          booking_date?: string | null
          booking_time?: string | null
          created_at?: string
          distance_km?: number | null
          drop_location: string
          estimated_fare?: number | null
          id?: string
          payment_status?: string | null
          phone: string
          pickup_location: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          ride_type: string
          status?: string | null
        }
        Update: {
          additional_notes?: string | null
          advance_amount?: number | null
          assigned_driver_id?: string | null
          booking_date?: string | null
          booking_time?: string | null
          created_at?: string
          distance_km?: number | null
          drop_location?: string
          estimated_fare?: number | null
          id?: string
          payment_status?: string | null
          phone?: string
          pickup_location?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          ride_type?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_assigned_driver_id_fkey"
            columns: ["assigned_driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_loyalty: {
        Row: {
          created_at: string
          discount_percentage: number
          email: string | null
          id: string
          phone: string
          total_bookings: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          discount_percentage?: number
          email?: string | null
          id?: string
          phone: string
          total_bookings?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          discount_percentage?: number
          email?: string | null
          id?: string
          phone?: string
          total_bookings?: number
          updated_at?: string
        }
        Relationships: []
      }
      driver_notifications: {
        Row: {
          created_at: string
          driver_id: string
          id: string
          is_read: boolean
          message: string
          title: string
        }
        Insert: {
          created_at?: string
          driver_id: string
          id?: string
          is_read?: boolean
          message: string
          title: string
        }
        Update: {
          created_at?: string
          driver_id?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "driver_notifications_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          id_proof_url: string | null
          license_number: string
          phone: string
          photo_url: string | null
          region: string
          rejection_reason: string | null
          status: Database["public"]["Enums"]["driver_status"]
          updated_at: string
          user_id: string | null
          vehicle_number: string
          vehicle_type: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          id_proof_url?: string | null
          license_number: string
          phone: string
          photo_url?: string | null
          region: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["driver_status"]
          updated_at?: string
          user_id?: string | null
          vehicle_number: string
          vehicle_type: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          id_proof_url?: string | null
          license_number?: string
          phone?: string
          photo_url?: string | null
          region?: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["driver_status"]
          updated_at?: string
          user_id?: string | null
          vehicle_number?: string
          vehicle_type?: string
        }
        Relationships: []
      }
      package_booked_seats: {
        Row: {
          booking_id: string
          created_at: string
          id: string
          passenger_gender: string | null
          passenger_name: string | null
          seat_id: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          id?: string
          passenger_gender?: string | null
          passenger_name?: string | null
          seat_id: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          id?: string
          passenger_gender?: string | null
          passenger_name?: string | null
          seat_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_booked_seats_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "package_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_booked_seats_seat_id_fkey"
            columns: ["seat_id"]
            isOneToOne: false
            referencedRelation: "package_seats"
            referencedColumns: ["id"]
          },
        ]
      }
      package_bookings: {
        Row: {
          advance_amount: number
          booking_id: string
          booking_status: Database["public"]["Enums"]["package_booking_status"]
          created_at: string
          customer_email: string | null
          customer_name: string
          customer_phone: string
          id: string
          is_family_booking: boolean
          is_women_booking: boolean
          loyalty_discount: number
          notes: string | null
          package_id: string
          paid_amount: number
          payment_status: Database["public"]["Enums"]["package_payment_status"]
          pickup_point_id: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          advance_amount: number
          booking_id: string
          booking_status?: Database["public"]["Enums"]["package_booking_status"]
          created_at?: string
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          id?: string
          is_family_booking?: boolean
          is_women_booking?: boolean
          loyalty_discount?: number
          notes?: string | null
          package_id: string
          paid_amount?: number
          payment_status?: Database["public"]["Enums"]["package_payment_status"]
          pickup_point_id?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          advance_amount?: number
          booking_id?: string
          booking_status?: Database["public"]["Enums"]["package_booking_status"]
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          id?: string
          is_family_booking?: boolean
          is_women_booking?: boolean
          loyalty_discount?: number
          notes?: string | null
          package_id?: string
          paid_amount?: number
          payment_status?: Database["public"]["Enums"]["package_payment_status"]
          pickup_point_id?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_bookings_pickup_point_id_fkey"
            columns: ["pickup_point_id"]
            isOneToOne: false
            referencedRelation: "pickup_points"
            referencedColumns: ["id"]
          },
        ]
      }
      package_routes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          stops: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          stops?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          stops?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      package_seats: {
        Row: {
          created_at: string
          id: string
          is_blocked: boolean
          package_id: string
          price: number
          seat_col: number
          seat_number: string
          seat_row: number
          seat_type: Database["public"]["Enums"]["seat_type"]
          status: Database["public"]["Enums"]["seat_status"]
        }
        Insert: {
          created_at?: string
          id?: string
          is_blocked?: boolean
          package_id: string
          price: number
          seat_col: number
          seat_number: string
          seat_row: number
          seat_type?: Database["public"]["Enums"]["seat_type"]
          status?: Database["public"]["Enums"]["seat_status"]
        }
        Update: {
          created_at?: string
          id?: string
          is_blocked?: boolean
          package_id?: string
          price?: number
          seat_col?: number
          seat_number?: string
          seat_row?: number
          seat_type?: Database["public"]["Enums"]["seat_type"]
          status?: Database["public"]["Enums"]["seat_status"]
        }
        Relationships: [
          {
            foreignKeyName: "package_seats_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_vehicles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          seat_layout: Json
          total_seats: number
          vehicle_type: Database["public"]["Enums"]["package_vehicle_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          seat_layout?: Json
          total_seats: number
          vehicle_type: Database["public"]["Enums"]["package_vehicle_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          seat_layout?: Json
          total_seats?: number
          vehicle_type?: Database["public"]["Enums"]["package_vehicle_type"]
        }
        Relationships: []
      }
      packages: {
        Row: {
          advance_percentage: number
          available_seats: number
          base_price: number
          created_at: string
          departure_date: string
          departure_time: string
          facilities_excluded: string[] | null
          facilities_included: string[] | null
          id: string
          is_active: boolean
          is_women_only: boolean
          middle_seat_discount: number
          return_date: string | null
          return_time: string | null
          route_id: string
          tags: string[] | null
          total_seats: number
          updated_at: string
          vehicle_id: string
          window_seat_extra: number
        }
        Insert: {
          advance_percentage?: number
          available_seats: number
          base_price?: number
          created_at?: string
          departure_date: string
          departure_time: string
          facilities_excluded?: string[] | null
          facilities_included?: string[] | null
          id?: string
          is_active?: boolean
          is_women_only?: boolean
          middle_seat_discount?: number
          return_date?: string | null
          return_time?: string | null
          route_id: string
          tags?: string[] | null
          total_seats: number
          updated_at?: string
          vehicle_id: string
          window_seat_extra?: number
        }
        Update: {
          advance_percentage?: number
          available_seats?: number
          base_price?: number
          created_at?: string
          departure_date?: string
          departure_time?: string
          facilities_excluded?: string[] | null
          facilities_included?: string[] | null
          id?: string
          is_active?: boolean
          is_women_only?: boolean
          middle_seat_discount?: number
          return_date?: string | null
          return_time?: string | null
          route_id?: string
          tags?: string[] | null
          total_seats?: number
          updated_at?: string
          vehicle_id?: string
          window_seat_extra?: number
        }
        Relationships: [
          {
            foreignKeyName: "packages_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "package_routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packages_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "package_vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      pickup_points: {
        Row: {
          address: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      pricing_config: {
        Row: {
          base_fare: number
          created_at: string
          id: string
          rate_per_km: number
          updated_at: string
          vehicle_type: string
        }
        Insert: {
          base_fare?: number
          created_at?: string
          id?: string
          rate_per_km?: number
          updated_at?: string
          vehicle_type: string
        }
        Update: {
          base_fare?: number
          created_at?: string
          id?: string
          rate_per_km?: number
          updated_at?: string
          vehicle_type?: string
        }
        Relationships: []
      }
      route_pickup_points: {
        Row: {
          id: string
          pickup_point_id: string
          route_id: string
          sort_order: number
        }
        Insert: {
          id?: string
          pickup_point_id: string
          route_id: string
          sort_order?: number
        }
        Update: {
          id?: string
          pickup_point_id?: string
          route_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "route_pickup_points_pickup_point_id_fkey"
            columns: ["pickup_point_id"]
            isOneToOne: false
            referencedRelation: "pickup_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_pickup_points_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "package_routes"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          booking_id: string | null
          completed_at: string | null
          created_at: string
          current_lat: number | null
          current_lng: number | null
          driver_id: string | null
          drop_lat: number | null
          drop_lng: number | null
          drop_location: string
          id: string
          pickup_lat: number | null
          pickup_lng: number | null
          pickup_location: string
          started_at: string | null
          status: Database["public"]["Enums"]["trip_status"]
          updated_at: string
        }
        Insert: {
          booking_id?: string | null
          completed_at?: string | null
          created_at?: string
          current_lat?: number | null
          current_lng?: number | null
          driver_id?: string | null
          drop_lat?: number | null
          drop_lng?: number | null
          drop_location: string
          id?: string
          pickup_lat?: number | null
          pickup_lng?: number | null
          pickup_location: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["trip_status"]
          updated_at?: string
        }
        Update: {
          booking_id?: string | null
          completed_at?: string | null
          created_at?: string
          current_lat?: number | null
          current_lng?: number | null
          driver_id?: string | null
          drop_lat?: number | null
          drop_lng?: number | null
          drop_location?: string
          id?: string
          pickup_lat?: number | null
          pickup_lng?: number | null
          pickup_location?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["trip_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      driver_status: "pending" | "approved" | "rejected"
      package_booking_status:
        | "pending"
        | "confirmed"
        | "cancelled"
        | "completed"
      package_payment_status: "pending" | "partial" | "paid" | "refunded"
      package_vehicle_type: "sedan" | "premium_suv" | "tempo_traveller"
      seat_status: "available" | "booked" | "blocked" | "selected"
      seat_type: "window" | "middle" | "aisle" | "driver"
      trip_status: "assigned" | "in_progress" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      driver_status: ["pending", "approved", "rejected"],
      package_booking_status: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
      ],
      package_payment_status: ["pending", "partial", "paid", "refunded"],
      package_vehicle_type: ["sedan", "premium_suv", "tempo_traveller"],
      seat_status: ["available", "booked", "blocked", "selected"],
      seat_type: ["window", "middle", "aisle", "driver"],
      trip_status: ["assigned", "in_progress", "completed", "cancelled"],
    },
  },
} as const
