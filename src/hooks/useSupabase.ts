import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Tables = Database['public']['Tables'];

export function useProperties(filters?: {
  city?: string;
  state?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const [properties, setProperties] = useState<Tables['properties']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        let query = supabase
          .from('properties')
          .select(`
            *,
            property_images (*),
            auctions (*)
          `);

        if (filters?.city) {
          query = query.eq('city', filters.city);
        }
        if (filters?.state) {
          query = query.eq('state', filters.state);
        }
        if (filters?.propertyType) {
          query = query.eq('property_type', filters.propertyType);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProperties(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [filters]);

  return { properties, loading, error };
}

export function useAuctions(status?: 'active' | 'ended' | 'draft' | 'cancelled') {
  const [auctions, setAuctions] = useState<Tables['auctions']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuctions() {
      try {
        let query = supabase
          .from('auctions')
          .select(`
            *,
            properties (*),
            property_images (*)
          `);

        if (status) {
          query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) throw error;
        setAuctions(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchAuctions();
  }, [status]);

  return { auctions, loading, error };
}

export function useBids(auctionId: string) {
  const [bids, setBids] = useState<Tables['bids']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBids() {
      try {
        const { data, error } = await supabase
          .from('bids')
          .select('*')
          .eq('auction_id', auctionId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBids(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchBids();
  }, [auctionId]);

  return { bids, loading, error };
}

export async function placeBid(auctionId: string, amount: number) {
  const { data: auction, error: auctionError } = await supabase
    .from('auctions')
    .select('current_price, bid_increment')
    .eq('id', auctionId)
    .single();

  if (auctionError) throw auctionError;

  const minBid = (auction.current_price || 0) + auction.bid_increment;
  if (amount < minBid) {
    throw new Error(`Minimum bid amount is ${minBid}`);
  }

  const { data, error } = await supabase
    .from('bids')
    .insert([
      {
        auction_id: auctionId,
        amount,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}