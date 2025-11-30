import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Download, LogOut, MapPin, Linkedin, Github, Globe, Shield, Loader2, ExternalLink } from "lucide-react";

function Profile() {
  const { user, profile, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
        logout();
        navigate("/login");
    }
  };

  // 🚀 DIRECT DOWNLOAD RESUME FUNCTION
  const handleDownloadResume = async () => {
    if (!profile?.resumePdf) {
      alert("⚠️ No resume available to download. Please generate one first.");
      return;
    }

    try {
      const response = await fetch(profile.resumePdf, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const fileName = `Resume_${profile.username || "User"}.pdf`;

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("⚠️ Could not download resume. Please try again.");
    }
  };

  // Helper to display N/A if data is missing
  const displayValue = (value) => {
    return value ? (
      <span className="text-slate-900 font-medium">{value}</span>
    ) : (
      <span className="text-slate-400 italic">N/A</span>
    );
  };

  // Helper for External Links
  const displayLink = (value, label) => {
    if (!value) return <span className="text-slate-400 italic">N/A</span>;
    return (
      <a 
        href={value.startsWith('http') ? value : `https://${value}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-teal-600 hover:text-teal-700 hover:underline flex items-center gap-1 font-medium"
      >
        {label} <ExternalLink size={12} />
      </a>
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-teal-600" size={32} />
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
            <button onClick={() => navigate("/login")} className="mt-4 text-teal-600 hover:underline">Go to Login</button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section (Simplified) */}
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Profile</h1>
            <p className="mt-2 text-slate-500">View your personal information and resume status.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Profile Banner / Avatar */}
          <div className="bg-slate-900 h-32 relative">
             <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold uppercase select-none shadow-inner">
                        {profile?.username ? profile.username.charAt(0) : "U"}
                    </div>
                </div>
             </div>
          </div>

          <div className="pt-16 pb-10 px-6 sm:px-10">
            
            <div className="space-y-8">
                
                {/* Section: Personal Details */}
                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5 border-b border-slate-100 pb-2 text-center sm:text-left">
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        
                        {/* Username */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400 shrink-0"><User size={18}/></div>
                            <div className="overflow-hidden">
                                <p className="text-xs text-slate-500 font-semibold uppercase">Display Name</p>
                                <div className="mt-1 truncate">{displayValue(profile?.username)}</div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400 shrink-0"><Mail size={18}/></div>
                            <div className="overflow-hidden">
                                <p className="text-xs text-slate-500 font-semibold uppercase flex items-center gap-1">
                                    Email <Shield size={10} className="text-emerald-500"/>
                                </p>
                                <div className="mt-1 truncate" title={profile?.email}>{displayValue(profile?.email)}</div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400 shrink-0"><Phone size={18}/></div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">Phone Number</p>
                                <div className="mt-1">{displayValue(profile?.phone)}</div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400 shrink-0"><MapPin size={18}/></div>
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">Address</p>
                                <div className="mt-1">{displayValue(profile?.address)}</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Section: Social Links */}
                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5 border-b border-slate-100 pb-2 text-center sm:text-left">
                        Professional Links
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        
                        {/* LinkedIn */}
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-blue-200 transition-colors">
                            <Linkedin className="text-blue-600 shrink-0" size={20}/>
                            <div className="overflow-hidden min-w-0">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">LinkedIn</p>
                                <div className="truncate text-sm">{displayLink(profile?.linkedin, "View Profile")}</div>
                            </div>
                        </div>

                        {/* GitHub */}
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-300 transition-colors">
                            <Github className="text-slate-800 shrink-0" size={20}/>
                            <div className="overflow-hidden min-w-0">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">GitHub</p>
                                <div className="truncate text-sm">{displayLink(profile?.github, "View Profile")}</div>
                            </div>
                        </div>

                        {/* Website */}
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-teal-200 transition-colors">
                            <Globe className="text-teal-600 shrink-0" size={20}/>
                            <div className="overflow-hidden min-w-0">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Website</p>
                                <div className="truncate text-sm">{displayLink(profile?.website, "Visit Site")}</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
          </div>
          
          {/* Footer - MOVED BUTTONS HERE */}
          <div className="bg-slate-50 px-6 py-5 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
             
             {/* Sign Out (Secondary Action) */}
             <button
                onClick={handleLogout}
                className="w-full sm:w-auto inline-flex justify-center items-center text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-4 py-2.5 rounded-xl transition-all"
             >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
             </button>

             {/* Download Resume (Primary Action) */}
             <button
                onClick={handleDownloadResume}
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-md text-white bg-slate-900 hover:bg-black hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all transform"
             >
                <Download className="h-4 w-4 mr-2" />
                Download Resume PDF
             </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;