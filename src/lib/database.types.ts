export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          property_id: string | null
          title: string
          description: string
          property_type: string
          built_area: number
          land_area: number | null
          bedrooms: number | null
          bathrooms: number | null
          address: string
          city: string
          state: string
          country: string
          postal_code: string
          latitude: number | null
          longitude: number | null
          amenities: string[] | null
          ownership_type: string | null
          possession_status: string | null
          zone_type: string | null
          reserve_price: number | null
          earnest_money: number | null
          inspection_dates: string[] | null
          seller_bank: string | null
          property_docs: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id?: string | null
          title: string
          description: string
          property_type: string
          built_area: number
          land_area?: number | null
          bedrooms?: number | null
          bathrooms?: number | null
          address: string
          city: string
          state: string
          country: string
          postal_code: string
          latitude?: number | null
          longitude?: number | null
          amenities?: string[] | null
          ownership_type?: string | null
          possession_status?: string | null
          zone_type?: string | null
          reserve_price?: number | null
          earnest_money?: number | null
          inspection_dates?: string[] | null
          seller_bank?: string | null
          property_docs?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string | null
          title?: string
          description?: string
          property_type?: string
          built_area?: number
          land_area?: number | null
          bedrooms?: number | null
          bathrooms?: number | null
          address?: string
          city?: string
          state?: string
          country?: string
          postal_code?: string
          latitude?: number | null
          longitude?: number | null
          amenities?: string[] | null
          ownership_type?: string | null
          possession_status?: string | null
          zone_type?: string | null
          reserve_price?: number | null
          earnest_money?: number | null
          inspection_dates?: string[] | null
          seller_bank?: string | null
          property_docs?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          url: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          url: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          url?: string
          is_primary?: boolean
          created_at?: string
        }
      }
      auctions: {
        Row: {
          id: string
          property_id: string
          status: string
          base_price: number
          reserve_price: number | null
          current_price: number | null
          bid_increment: number
          start_date: string
          end_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          status?: string
          base_price: number
          reserve_price?: number | null
          current_price?: number | null
          bid_increment: number
          start_date: string
          end_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          status?: string
          base_price?: number
          reserve_price?: number | null
          current_price?: number | null
          bid_increment?: number
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          auction_id: string
          user_id: string
          amount: number
          created_at: string
        }
        Insert: {
          id?: string
          auction_id: string
          user_id: string
          amount: number
          created_at?: string
        }
        Update: {
          id?: string
          auction_id?: string
          user_id?: string
          amount?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}