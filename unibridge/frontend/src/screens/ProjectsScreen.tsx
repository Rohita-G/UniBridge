import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from './ProjectsScreenStyles';

interface FormData {
  subject: string;
  gradeLevel: string;
  timeframe: string;
  skillLevel: string;
  teamSize: string;
  resources: string;
  interests: string;
  constraints: string;
  projectGoals: string;
  preferredTechnologies: string;
  learningObjectives: string;
}

interface ProjectIdea {
  title: string;
  description: string;
  report: {
    overview: string;
    materials: string[];
    steps: string[];
    learningOutcomes: string[];
    extensions: string[];
  };
}

const ProjectsScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    gradeLevel: '',
    timeframe: '',
    skillLevel: '',
    teamSize: '1',
    resources: '',
    interests: '',
    constraints: '',
    projectGoals: '',
    preferredTechnologies: '',
    learningObjectives: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.gradeLevel.trim()) newErrors.gradeLevel = 'Grade level is required';
    if (!formData.timeframe.trim()) newErrors.timeframe = 'Timeframe is required';
    if (!formData.skillLevel.trim()) newErrors.skillLevel = 'Skill level is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const API_BASE_URL = 'http://localhost:3000'; // Update this to your actual backend URL

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setIdeas([]); // Clear previous ideas
    setErrors({}); // Clear errors after successful validation

    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the entire formData to the backend
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Received data:', data);
  
      if (data.ideas && Array.isArray(data.ideas)) {
        setIdeas(data.ideas);
      } else {
        console.error('Invalid response format:', data);
        Alert.alert('Error', 'Received invalid data format from server');
      }
  
    } catch (error) {
      console.error('Detailed error:', error);
      Alert.alert('Error', `Failed to generate ideas: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateMoreIdeas = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          previousIdeas: ideas.map(idea => idea.title) // Send just the titles to avoid large payload
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.ideas && Array.isArray(data.ideas)) {
        setIdeas(prevIdeas => [...prevIdeas, ...data.ideas]);
      } else {
        console.error('Invalid response format:', data);
        Alert.alert('Error', 'Received invalid data format from server');
      }
      
    } catch (error) {
      console.error('Error generating more ideas:', error);
      Alert.alert('Error', 'Failed to generate additional ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateSimilarIdeas = async (idea: ProjectIdea) => {
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-similar-ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          baseIdea: idea,
          formData
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.ideas && Array.isArray(data.ideas)) {
        setIdeas(data.ideas);
      } else {
        console.error('Invalid response format:', data);
        Alert.alert('Error', 'Received invalid data format from server');
      }
      
    } catch (error) {
      console.error('Error generating similar ideas:', error);
      Alert.alert('Error', 'Failed to generate similar ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const viewReport = (idea: ProjectIdea) => {
    setSelectedIdea(idea);
    setShowReport(true);
  };
  
  const closeReport = () => {
    setShowReport(false);
    setSelectedIdea(null);
  };

  // Project form UI
  const renderProjectForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Project Requirements</Text>
      
      <Text style={styles.label}>Subject Area *</Text>
      <View style={[styles.select, errors.subject && styles.errorInput]}>
        <TextInput
          style={styles.input}
          placeholder="e.g., Science, History, Programming"
          value={formData.subject}
          onChangeText={(text) => handleChange('subject', text)}
        />
      </View>
      {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
      
      <Text style={styles.label}>Grade Level *</Text>
      <View style={[styles.select, errors.gradeLevel && styles.errorInput]}>
        <TextInput
          style={styles.input}
          placeholder="e.g., Elementary, Middle School, High School"
          value={formData.gradeLevel}
          onChangeText={(text) => handleChange('gradeLevel', text)}
        />
      </View>
      {errors.gradeLevel && <Text style={styles.errorText}>{errors.gradeLevel}</Text>}
      
      <Text style={styles.label}>Project Timeframe *</Text>
      <View style={[styles.select, errors.timeframe && styles.errorInput]}>
        <TextInput
          style={styles.input}
          placeholder="e.g., Short (1-2 days), Medium (1-2 weeks)"
          value={formData.timeframe}
          onChangeText={(text) => handleChange('timeframe', text)}
        />
      </View>
      {errors.timeframe && <Text style={styles.errorText}>{errors.timeframe}</Text>}
      
      <Text style={styles.label}>Skill Level *</Text>
      <View style={[styles.select, errors.skillLevel && styles.errorInput]}>
        <TextInput
          style={styles.input}
          placeholder="e.g., Beginner, Intermediate, Advanced"
          value={formData.skillLevel}
          onChangeText={(text) => handleChange('skillLevel', text)}
        />
      </View>
      {errors.skillLevel && <Text style={styles.errorText}>{errors.skillLevel}</Text>}
      
      {/* Optional fields (collapsible in web, always shown here) */}
      <Text style={[styles.label, styles.optional]}>Additional Details (Optional)</Text>
      
      {/* Optional fields (continued) */}
      <Text style={styles.label}>Team Size</Text>
      <View style={styles.select}>
        <TextInput
          style={styles.input}
          placeholder="e.g., 1, 2-3, 4+"
          value={formData.teamSize}
          onChangeText={(text) => handleChange('teamSize', text)}
        />
      </View>

      <Text style={styles.label}>Available Resources</Text>
      <TextInput
        style={styles.textarea}
        placeholder="What materials, software, or equipment do you have access to?"
        value={formData.resources}
        onChangeText={(text) => handleChange('resources', text)}
        multiline
      />

      <Text style={styles.label}>Personal Interests</Text>
      <TextInput
        style={styles.textarea}
        placeholder="What topics, themes, or areas are you interested in?"
        value={formData.interests}
        onChangeText={(text) => handleChange('interests', text)}
        multiline
      />

      <Text style={styles.label}>Constraints</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Any limitations or requirements you need to work within?"
        value={formData.constraints}
        onChangeText={(text) => handleChange('constraints', text)}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitButtonText}>
          {loading ? 'Finding Projects...' : 'Find Project Ideas'}
        </Text>
      </TouchableOpacity>
    </View>
  );
  
  // Results UI
  const renderResults = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4299e1" />
          <Text style={styles.loadingText}>Generating project ideas with AI...</Text>
          <Text style={styles.loadingSubtext}>Analyzing your requirements and generating personalized suggestions</Text>
        </View>
      );
    }
    
    if (ideas.length > 0) {
      return (
        <View style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>AI-Generated Project Ideas</Text>
          <Text style={styles.resultsSubtitle}>
            Here are some customized project ideas based on your requirements.
          </Text>
          
          {ideas.map((idea, index) => (
            <View key={index} style={styles.ideaCard}>
              <Text style={styles.ideaTitle}>{idea.title}</Text>
              <Text style={styles.ideaDescription}>{idea.description}</Text>
              <View style={styles.ideaButtons}>
                <TouchableOpacity 
                  style={styles.ideaButton}
                  onPress={() => viewReport(idea)}
                >
                  <Text style={styles.ideaButtonText}>View Full Report</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.ideaButton, styles.greenButton]}
                  onPress={() => generateSimilarIdeas(idea)}
                >
                  <Text style={styles.ideaButtonText}>Generate Similar Ideas</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.moreIdeasButton}
            onPress={generateMoreIdeas}
            disabled={loading}
          >
            <Text style={styles.moreIdeasButtonText}>Generate More Ideas</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.sectionTitle}>AI-Powered Project Idea Generator</Text>
        <Text style={styles.emptyText}>
          Fill out the form to get unlimited, customized project suggestions generated by AI
          based on your specific needs and interests.
        </Text>
      </View>
    );
  };

  // Detailed report UI
  const renderReport = () => {
    if (!selectedIdea) return null;
    
    return (
      <ScrollView style={styles.reportContainer}>
        <View style={styles.reportHeader}>
          <Text style={styles.reportTitle}>{selectedIdea.title}</Text>
          <TouchableOpacity onPress={closeReport}>
            <Text style={styles.backButton}>← Back to ideas</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.reportSection}>
          <Text style={styles.reportSectionTitle}>Project Overview</Text>
          <Text style={styles.reportText}>{selectedIdea.report.overview}</Text>
        </View>
        
        <View style={styles.reportSection}>
          <Text style={styles.reportSectionTitle}>Materials Needed</Text>
          {selectedIdea.report.materials.map((item, index) => (
            <Text key={index} style={styles.reportListItem}>• {item}</Text>
          ))}
        </View>
        
        <View style={styles.reportSection}>
          <Text style={styles.reportSectionTitle}>Project Steps</Text>
          {selectedIdea.report.steps.map((step, index) => (
            <Text key={index} style={styles.reportListItem}>{index + 1}. {step}</Text>
          ))}
        </View>
        
        <View style={styles.reportSection}>
          <Text style={styles.reportSectionTitle}>Learning Outcomes</Text>
          {selectedIdea.report.learningOutcomes.map((outcome, index) => (
            <Text key={index} style={styles.reportListItem}>• {outcome}</Text>
          ))}
        </View>
        
        <View style={styles.reportSection}>
          <Text style={styles.reportSectionTitle}>Extension Ideas</Text>
          {selectedIdea.report.extensions.map((extension, index) => (
            <Text key={index} style={styles.reportListItem}>• {extension}</Text>
          ))}
        </View>
        
        <View style={styles.reportActions}>
          <TouchableOpacity 
            style={styles.reportButton}
            onPress={() => generateSimilarIdeas(selectedIdea)}
          >
            <Text style={styles.reportButtonText}>Generate Variations</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Project Idea Generator</Text>
        <Text style={styles.subtitle}>Find the perfect project idea based on your requirements</Text>
      </View>
      
      {!showReport ? (
        <View style={styles.content}>
          {renderProjectForm()}
          {renderResults()}
        </View>
      ) : (
        renderReport()
      )}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Project Idea Generator for Students • Powered by Advanced AI Technology
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProjectsScreen;



// ProjectsScreen.tsx
// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

// export default function ProjectsScreen() {
//   const [subject, setSubject] = useState('');
//   const [ideas, setIdeas] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const getIdeas = async () => {
//     if (!subject.trim()) {
//       setError('Please enter a subject');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setIdeas([]);

//     try {
//       const response = await fetch('http://192.168.5.144:5000/api/project-ideas', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ subject }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setIdeas(data.ideas);
//       } else {
//         setError(data.error || 'Failed to get ideas');
//       }
//     } catch (err) {
//       setError('Error connecting to server');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>AI Project Idea Generator</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter subject (e.g. Physics)"
//         value={subject}
//         onChangeText={setSubject}
//       />
//       <Button title="Generate Ideas" onPress={getIdeas} />

//       {loading && <ActivityIndicator style={styles.loading} size="large" color="#007bff" />}
//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       {ideas.length > 0 && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Generated Ideas:</Text>
//           {ideas.map((idea, index) => (
//             <Text key={index} style={styles.idea}>
//               • {idea}
//             </Text>
//           ))}
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//     alignItems: 'center',
//     backgroundColor: '#f0f4ff',
//     flexGrow: 1,
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 12,
//     borderColor: '#007bff',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//   },
//   loading: {
//     marginVertical: 20,
//   },
//   error: {
//     color: 'red',
//     marginTop: 10,
//   },
//   resultContainer: {
//     marginTop: 20,
//     width: '100%',
//   },
//   resultTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   idea: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
// });