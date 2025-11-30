import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github, Twitter, MapPin, Instagram } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 px-4 sm:px-6 lg:px-8 font-sans mt-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Adjusted to 3 columns since Support is removed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
               {/* Logo Placeholder */}
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">R</div>
               <span className="text-lg font-extrabold text-slate-900 tracking-tight">ResumeQualify</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              AI-powered resume optimization tool to help students and professionals land their dream jobs.
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
               <MapPin size={14} /> Patna, Bihar, India
            </div>
          </div>

          {/* Quick Links (Product) */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/templates" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">Templates</Link></li>
              <li><Link to="/atschecker" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">ATS Scanner</Link></li>
              <li><Link to="/templates" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">Resume Builder</Link></li>
            </ul>
          </div>

          {/* Connect (Socials) */}
          <div>
             <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Connect</h3>
             <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/nileshdev" className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-all">
                   <Linkedin size={20} />
                </a>
                <a href="https://github.com/nilshru" className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all">
                   <Github size={20} />
                </a>
                <a href="https://www.instagram.com/nilesh.sharma.dev" className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 hover:text-sky-500 transition-all">
                   <Instagram size={20} />
                </a>
             </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-slate-400 text-xs">
             &copy; {currentYear} Amity University, Patna. All rights reserved.
           </p>
           <p className="text-slate-400 text-xs flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             System Operational
           </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;