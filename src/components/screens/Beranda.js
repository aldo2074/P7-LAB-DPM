import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BerandaScreen() {
 return (
   <SafeAreaView style={styles.container}>
     <ScrollView contentContainerStyle={styles.scrollView}>
       <View style={styles.headerContainer}>
         <Text style={styles.title}>ToDone</Text>
         <Text style={styles.subtitle}>Kelola Tugas Anda dengan Mudah</Text>
       </View>

       <View style={styles.contentContainer}>
         <View style={styles.formContainer}>
           <View style={styles.welcomeSection}>
             <View style={styles.iconContainer}>
               <Icon name="checkbox" size={40} color="#FF6B6B" />
             </View>
             <Text style={styles.sectionTitle}>Selamat Datang di ToDone</Text>
             <Text style={styles.sectionText}>
               Aplikasi yang membantu Anda mengelola dan melacak tugas-tugas 
               harian dengan lebih efisien dan terorganisir.
             </Text>
           </View>
         </View>

         <View style={styles.formContainer}>
           <Text style={styles.sectionTitle}>Fitur</Text>
           
           <View style={styles.featureList}>
             <View style={styles.featureItem}>
               <Icon name="create-outline" size={24} color="#FF6B6B" style={styles.featureIcon} />
               <View style={styles.featureContent}>
                 <Text style={styles.featureTitle}>Buat dan Edit</Text>
                 <Text style={styles.featureText}>
                   Buat dan edit tugas dengan mudah
                 </Text>
               </View>
             </View>

             <View style={styles.featureItem}>
               <Icon name="list-outline" size={24} color="#FF6B6B" style={styles.featureIcon} />
               <View style={styles.featureContent}>
                 <Text style={styles.featureTitle}>Daftar Tugas</Text>
                 <Text style={styles.featureText}>
                   Lihat semua daftar tugas Anda
                 </Text>
               </View>
             </View>

             <View style={styles.featureItem}>
               <Icon name="trash-outline" size={24} color="#FF6B6B" style={styles.featureIcon} />
               <View style={styles.featureContent}>
                 <Text style={styles.featureTitle}>Hapus</Text>
                 <Text style={styles.featureText}>
                   Hapus tugas yang tidak diperlukan
                 </Text>
               </View>
             </View>
           </View>
         </View>
       </View>
     </ScrollView>
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#f8f9fa',
 },
 scrollView: {
   flexGrow: 1,
 },
 headerContainer: {
   padding: 24,
   alignItems: 'center',
   backgroundColor: '#ffffff',
   borderBottomLeftRadius: 20,
   borderBottomRightRadius: 20,
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 4,
   },
   shadowOpacity: 0.1,
   shadowRadius: 12,
   elevation: 8,
   marginBottom: 24,
 },
 title: {
   fontSize: 32,
   fontWeight: 'bold',
   color: '#FF6B6B',
   marginBottom: 8,
 },
 subtitle: {
   fontSize: 16,
   color: '#4A4A4A',
 },
 contentContainer: {
   padding: 24,
   gap: 24,
 },
 formContainer: {
   backgroundColor: '#ffffff',
   borderRadius: 20,
   padding: 24,
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 4,
   },
   shadowOpacity: 0.1,
   shadowRadius: 12,
   elevation: 8,
 },
 welcomeSection: {
   alignItems: 'center',
   gap: 16,
 },
 iconContainer: {
   width: 80,
   height: 80,
   borderRadius: 40,
   backgroundColor: 'rgba(255, 107, 107, 0.1)',
   alignItems: 'center',
   justifyContent: 'center',
   marginBottom: 8,
 },
 sectionTitle: {
   fontSize: 20,
   fontWeight: '600',
   color: '#4A4A4A',
   marginBottom: 16,
 },
 sectionText: {
   fontSize: 16,
   color: '#666666',
   lineHeight: 24,
   textAlign: 'center',
 },
 featureList: {
   gap: 16,
 },
 featureItem: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#FAFAFA',
   borderRadius: 12,
   padding: 16,
   borderWidth: 1,
   borderColor: '#E0E0E0',
 },
 featureIcon: {
   marginRight: 16,
 },
 featureContent: {
   flex: 1,
 },
 featureTitle: {
   fontSize: 16,
   fontWeight: '600',
   color: '#4A4A4A',
   marginBottom: 4,
 },
 featureText: {
   fontSize: 14,
   color: '#666666',
 },
});