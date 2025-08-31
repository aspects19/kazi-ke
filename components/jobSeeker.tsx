import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { JobCard } from './jobCard';
import { Search, Filter, X } from 'lucide-react-native';
import { AppwriteException } from 'react-native-appwrite';
import { config, getCollection } from '@/lib/appwrite';
import type { VerboseJobDocument } from '@/types/docuType';
import { formatPostedAt } from '@/utils/formatPostAt';

export const JobSeekerView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState<VerboseJobDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const [locations, setLocations] = useState<string[]>([]);

  async function fetchRecommendedJobs() {
    try {
      setLoading(true);
      const response = await getCollection(config.jobsCollectionId);
      const jobs = (response as any[]).map((doc) => ({
        ...doc,
        title: doc.title ?? '',
        posted_at: doc.posted_at ?? '',
        applicants: doc.applicants ?? 0,
        status: doc.status ?? 'Active',
        $id: doc.$id,
      }));
      setRecommendedJobs(jobs);

      // Extract unique locations dynamically
      const locs = Array.from(new Set(jobs.map((job) => job.location || 'Unknown')));
      setLocations(locs);
    } catch (err) {
      if (err instanceof AppwriteException) {
        Alert.alert(err.message);
      } else console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecommendedJobs();
  }, []);

  // Filter and search logic
  const filteredJobs = recommendedJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filters.location ? job.location === filters.location : true;
    return matchesSearch && matchesLocation;
  });

  return (
    <ScrollView className="space-y-4">
      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#15161eff',
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginTop: 16,
        }}
      >
        <Search size={18} color="#0e4fc0ff" style={{ marginRight: 8 }} />

        <TextInput
          placeholder="Search jobs"
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={{
            flex: 1,
            color: '#fff',
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#F3F4F6',
            padding: 6,
            borderRadius: 6,
            marginLeft: 8,
          }}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Filters Section */}
      {showFilters && (
        <View
          style={{
            backgroundColor: '#1F2937',
            padding: 16,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          {/* Close Button */}
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', marginBottom: 10 }}
            onPress={() => setShowFilters(false)}
          >
            <X size={20} color="#fff" />
          </TouchableOpacity>

          {/* Location Filter */}
          <Text style={{ color: '#fff', marginVertical: 8 }}>Filter by Location</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {locations.map((loc) => (
              <TouchableOpacity
                key={loc}
                onPress={() =>
                  setFilters((prev) => ({
                    ...prev,
                    location: prev.location === loc ? '' : loc,
                  }))
                }
                style={{
                  backgroundColor: filters.location === loc ? '#2563EB' : '#E5E7EB',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 8,
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: filters.location === loc ? '#fff' : '#111',
                  }}
                >
                  {loc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Recommended Jobs */}
      <View className="flex-row justify-between items-center mt-4" >
        <Text className="text-lg font-semibold dark:text-white  ">
          Recommended Jobs
        </Text>
        <TouchableOpacity>
          <Text className="text-blue-600 dark:text-blue-400 text-sm font-medium ">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Job List */}
      <View className="space-y-3 pt-2">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, idx) => (
            <JobCard
              key={job.$id}
              job={{
                id: idx + 1,
                title: job.title || '',
                company: job.company || 'Unknown Company',
                location: job.location || 'Unknown Location',
                salary: job.salary || 'N/A',
                type: job.type || 'N/A',
                posted: formatPostedAt(job.posted_at) || '',
                logo: job.logo || 'https://via.placeholder.com/50',
              }}
            />
          ))
        ) : (
          <Text style={{ color: '#9CA3AF', marginTop: 10 }}>No jobs found.</Text>
        )}
      </View>

      {/* Applications Section */}
      <View className="mt-6">
        <Text className="text-lg font-semibold mb-3 dark:text-white ">
          Your Applications
        </Text>
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 ">
          <Text className="text-center text-gray-500 dark:text-gray-400 py-4 ">
            You haven't applied to any jobs yet.
          </Text>
          <TouchableOpacity className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg">
            <Text className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium ">
              Browse More Jobs
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
