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
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          updated_at: string
          topics: string[]
          newsletter_name: string | null
          newsletter_pitch: string | null
          tone: string | null
          language: string | null
          target_audience: string | null
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          created_at?: string
          updated_at?: string
          topics?: string[]
          newsletter_name?: string | null
          newsletter_pitch?: string | null
          tone?: string | null
          language?: string | null
          target_audience?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          created_at?: string
          updated_at?: string
          topics?: string[]
          newsletter_name?: string | null
          newsletter_pitch?: string | null
          tone?: string | null
          language?: string | null
          target_audience?: string | null
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