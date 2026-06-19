export const physicsFormulas = [
  {
    id: 1,
    name: "රේඛීය චලිතයේ අවසාන ප්රවේගය (Final Velocity in Linear Motion)",
    formula: "v = u + at",
    unit: "m s^{-1}",
    description: "ඒකාකාර ත්වරණයෙන් චලිත වන වස්තුවක t කාලයකට පසු අවසාන ප්රවේගය සෙවීම.",
    tags: "Linear motion, රේඛීය චලිතය, Velocity, ප්රවේගය, Kinematics"
  },
  {
    id: 2,
    name: "රේඛීය චලිතයේ විස්ථාපනය (Displacement in Linear Motion)",
    formula: "s = ut + \\frac{1}{2}at^2",
    unit: "m",
    description: "ඒකාකාර ත්වරණයෙන් චලිත වන වස්තුවක t කාලයක් තුළ විස්ථාපනය සෙවීම.",
    tags: "Displacement, විස්ථාපනය, Linear motion, රේඛීය චලිතය"
  },
  {
    id: 3,
    name: "කාලය රහිත රේඛීය චලිත සමීකරණය (Velocity-Displacement Equation)",
    formula: "v^2 = u^2 + 2as",
    unit: "(m s^{-1})^2",
    description: "කාලය නොදන්නා විට අවසාන ප්රවේගය හෝ විස්ථාපනය ගණනය කිරීම.",
    tags: "Velocity, ප්රවේගය, Kinematics, රේඛීය චලිතය"
  },
  {
    id: 4,
    name: "නිව්ටන්ගේ දෙවන නියමය (Newton's Second Law)",
    formula: "F = ma",
    unit: "N",
    description: "වස්තුවක් මත ක්රියා කරන සම්ප්රයුක්ත බලය, එහි ස්කන්ධයේ සහ ත්වරණයේ ගුණිතයට සමාන වේ.",
    tags: "Newton, නිව්ටන්, Force, බලය, Dynamics"
  },
  {
    id: 5,
    name: "ගම්යතාව (Momentum)",
    formula: "p = mv",
    unit: "kg m s^{-1}",
    description: "චලනය වන වස්තුවක ස්කන්ධයේ සහ ප්රවේගයේ ගුණිතයයි.",
    tags: "Momentum, ගම්යතාව, Velocity, ප්රවේගය"
  },
  {
    id: 6,
    name: "යාන්ත්රික කාර්යය (Mechanical Work)",
    formula: "W = Fs \\cos \\theta",
    unit: "J",
    description: "බලයක් මගින් වස්තුවක් බලයේ දිශාවට ආනතව විස්ථාපනය කිරීමේදී කරන ලද කාර්යය.",
    tags: "Work, කාර්යය, Force, බලය, Energy"
  },
  {
    id: 7,
    name: "චාලක ශක්තිය (Kinetic Energy)",
    formula: "E_k = \\frac{1}{2}mv^2",
    unit: "J",
    description: "v ප්රවේගයකින් චලනය වන m ස්කන්ධයක් ඇති වස්තුවක් සතු ගතික ශක්තිය.",
    tags: "Kinetic energy, චාලක ශක්තිය, Energy, ශක්තිය"
  },
  {
    id: 8,
    name: "ගුරුත්වාකර්ෂණ විභව ශක්තිය (Gravitational Potential Energy)",
    formula: "E_p = mgh",
    unit: "J",
    description: "ගුරුත්වාකර්ෂණ ක්ෂේත්රයක් තුළ h උසකින් තබා ඇති වස්තුවක් සතු ශක්තිය.",
    tags: "Potential energy, විභව ශක්තිය, Gravity, ගුරුත්වය"
  },
  {
    id: 9,
    name: "ක්ෂමතාව (Power)",
    formula: "P = \\frac{W}{t} \\text{ or } P = Fv",
    unit: "W",
    description: "කාර්යය කිරීමේ සීඝ්රතාව හෙවත් ශක්තිය වැය වීමේ සීඝ්රතාවයයි.",
    tags: "Power, ක්ෂමතාව, Work, කාර්යය"
  },
  {
    id: 10,
    name: "ඝනත්වය (Density)",
    formula: "\\rho = \\frac{m}{V}",
    unit: "kg m^{-3}",
    description: "ද්රව්යයක ඒකක පරිමාවක අඩංගු ස්කන්ධයයි.",
    tags: "Density, ඝනත්වය, Mass, ස්කන්ධය, Volume"
  },
  {
    id: 11,
    name: "පීඩනය (Pressure)",
    formula: "P = \\frac{F}{A}",
    unit: "Pa",
    description: "පෘෂ්ඨයක ඒකක වර්ගඵලයක් මත ලම්බකව ක්රියා කරන බලයයි.",
    tags: "Pressure, පීඩනය, Force, බලය, Area"
  },
  {
    id: 12,
    name: "ද්රවස්ථිති පීඩනය (Hydrostatic Pressure)",
    formula: "P = h\\rho g",
    unit: "Pa",
    description: "\\rho ඝනත්වයක් ඇති ද්රවයක h ගැඹුරකදී ද්රව කඳ මගින් ඇති කරන පීඩනය.",
    tags: "Hydrostatic, ද්රව පීඩනය, Depth, ගැඹුර, Fluid"
  },
  {
    id: 13,
    name: "උත්ප්ලාවකතාව / ආකිමිඩීස් තෙරපුම (Upthrust)",
    formula: "U = V\\rho g",
    unit: "N",
    description: "ද්රවයක ගිලී ඇති වස්තුවක් මත ද්රවය මගින් ඇති කරන ඉහළට යොමුවූ සම්ප්රයුක්ත බලය.",
    tags: "Upthrust, උඩුරු තෙරපුම, Archimedes, ආකිමිඩීස්, Buoyancy"
  },
  {
    id: 14,
    name: "හුක් නියමය (Hooke's Law)",
    formula: "F = kx",
    unit: "N",
    description: "ප්රත්යාස්ථතා සීමාව තුළ කම්බියක හෝ දුන්නක ඇතිවන විතතිය එයට යොදන බලයට අනුලෝමව සමානුපාතික වේ.",
    tags: "Hooke's Law, හුක් නියමය, Elasticity, ප්රත්යාස්ථතාව, Spring"
  },
  {
    id: 15,
    name: "යං මාපාංකය (Young's Modulus)",
    formula: "Y = \\frac{Fl}{Ae}",
    unit: "N m^{-2}",
    description: "ඝන ද්රව්යයක ප්රත්යාස්ථතාව මනින මිනුමයි (ආතන ප්රත්යාබලය / ආතන වික්රියාව).",
    tags: "Young's Modulus, යං මාපාංකය, Elasticity, ප්රත්යාබලය, Strain"
  },
  {
    id: 16,
    name: "තාප ධාරිතාව හා උෂ්ණත්ව වෙනස (Heat Capacity & Temp Change)",
    formula: "Q = mc\\Delta\\theta",
    unit: "J",
    description: "m ස්කන්ධයක් ඇති වස්තුවක උෂ්ණත්වය වෙනස් කිරීමට ලබා දිය යුතු හෝ ඉවත් කළ යුතු තාප ප්රමාණය.",
    tags: "Heat, තාපය, Specific heat capacity, විශිෂ්ට තාප ධාරිතාව, Temperature"
  },
  {
    id: 17,
    name: "ගුප්ත තාපය (Latent Heat)",
    formula: "Q = ml",
    unit: "J",
    description: "උෂ්ණත්වය වෙනස් නොකර වස්තුවක භෞතික අවස්ථාව වෙනස් කිරීමට අවශ්ය තාපය.",
    tags: "Latent heat, ගුප්ත තාපය, Phase change, අවස්ථා විපර්යාසය"
  },
  {
    id: 18,
    name: "පරිපූර්ණ වායු සමීකරණය (Ideal Gas Law)",
    formula: "PV = nRT",
    unit: "-",
    description: "පරිපූර්ණ වායුවක පීඩනය, පරිමාව, මවුල ගණන සහ නිරපේක්ෂ උෂ්ණත්වය අතර සම්බන්ධය.",
    tags: "Ideal gas, පරිපූර්ණ වායු, Pressure, Volume, Thermodynamics"
  },
  {
    id: 19,
    name: "තරංග ප්රවේගය (Wave Speed)",
    formula: "v = f\\lambda",
    unit: "m s^{-1}",
    description: "ඕනෑම තරංගයක වේගය, එහි සංඛ්යාතය සහ තරංග ආයාමය අතර සම්බන්ධයයි.",
    tags: "Wave speed, තරංග ප්රවේගය, Frequency, සංඛ්යාතය, Wavelength"
  },
  {
    id: 20,
    name: "සරල අවලම්භයේ ආවර්ත කාලය (Period of a Simple Pendulum)",
    formula: "T = 2\\pi\\sqrt{\\frac{l}{g}}",
    unit: "s",
    description: "l දිගකින් යුත් සරල අවලම්භයක් එක් සම්පූර්ණ දෝලනයක් සඳහා ගත කරන කාලය.",
    tags: "Pendulum, අවලම්භය, Period, ආවර්ත කාලය, Oscillation"
  },
  {
    id: 21,
    name: "ඕම්ගේ නියමය (Ohm's Law)",
    formula: "V = IR",
    unit: "V",
    description: "උෂ්ණත්වය නියත විට සන්නායකයක් හරහා ගලන ධාරාව, එහි දෙකෙළවර විභව අන්තරයට අනුලෝමව සමානුපාතික වේ.",
    tags: "Ohm's Law, ඕම්ගේ නියමය, Voltage, විභව අන්තරය, Current"
  },
  {
    id: 22,
    name: "විද්යුත් ක්ෂමතාව (Electrical Power)",
    formula: "P = VI = I^2 R = \\frac{V^2}{R}",
    unit: "W",
    description: "විද්යුත් පරිපථයක හෝ උපකරණයක විද්යුත් ශක්තිය වැය වීමේ සීඝ්රතාවය.",
    tags: "Electrical power, විද්යුත් ක්ෂමතාව, Energy, Voltage, Current"
  },
  {
    id: 23,
    name: "ශ්රේණිගත ප්රතිරෝධ (Resistors in Series)",
    formula: "R_s = R_1 + R_2 + R_3 + ...",
    unit: "\\Omega",
    description: "ප්රතිරෝධක කිහිපයක් ශ්රේණිගතව (එක පෙළට) සම්බන්ධ කළ විට එහි සමක ප්රතිරෝධය සෙවීම.",
    tags: "Series, ශ්රේණිගත, Resistors, ප්රතිරෝධක, Equivalent resistance"
  },
  {
    id: 24,
    name: "සමාන්තරගත ප්රතිරෝධ (Resistors in Parallel)",
    formula: "\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + ...",
    unit: "\\Omega",
    description: "ප්රතිරෝධක කිහිපයක් සමාන්තරගතව සම්බන්ධ කළ විට එහි සමක ප්රතිරෝධය සෙවීම.",
    tags: "Parallel, සමාන්තරගත, Resistors, ප්රතිරෝධක, Equivalent resistance"
  },
  {
    id: 25,
    name: "වීන් විස්ථාපන නියමය (Wien's Displacement Law)",
    formula: "\\lambda_m T = C",
    unit: "m K",
    description: "කෘෂ්ණ වස්තුවකින් විමෝචනය වන උපරිම තීව්රතාවට අනුරූප තරංග ආයාමය (\\lambda_m) සහ එහි නිරපේක්ෂ උෂ්ණත්වය (T) අතර සම්බන්ධයයි.",
    tags: "වීන් නියමය, Wien, Blackbody, කෘෂ්ණ වස්තු, Wavelength, තරංග ආයාමය"
  },
  {
    id: 26,
    name: "ස්ටෙෆාන් නියමය (Stefan's Law)",
    formula: "E = \\sigma T^4",
    unit: "W m^{-2}",
    description: "පරිපූර්ණ කෘෂ්ණ වස්තුවක ඒකක වර්ගඵලයකින් ඒකක කාලයකදී විමෝචනය වන මුළු විකිරණ ක්ෂමතාව නිරපේක්ෂ උෂ්ණත්වයේ සිව්වන බලයට සමානුපාතික වේ.",
    tags: "ස්ටෙෆාන් නියමය, Stefan, Radiation, විකිරණය, Blackbody"
  },
  {
    id: 27,
    name: "කෘෂ්ණ වස්තුවක මුළු විමෝචන ක්ෂමතාව (Total Radiated Power of a Blackbody)",
    formula: "P = A \\sigma T^4",
    unit: "W",
    description: "වර්ගඵලය A වන පරිපූර්ණ කෘෂ්ණ වස්තුවකින් විමෝචනය වන මුළු තාප විකිරණ ක්ෂමතාව ගණනය කිරීම.",
    tags: "Power, ක්ෂමතාව, Blackbody, කෘෂ්ණ වස්තු, Stefan"
  },
  {
    id: 28,
    name: "සාමාන්ය වස්තුවක විමෝචන ක්ෂමතාව (Radiated Power of a Non-Blackbody)",
    formula: "P = e A \\sigma T^4",
    unit: "W",
    description: "විමෝචකතාව (e) සහිත සාමාන්ය වස්තුවකින් පිටවන මුළු තාප විකිරණ ක්ෂමතාව ගණනය කිරීම.",
    tags: "Emissivity, විමෝචකතාව, Radiation, තාප විකිරණය"
  },
  {
    id: 29,
    name: "ෆෝටෝනයක ශක්තිය (Energy of a Photon)",
    formula: "E = hf = \\frac{hc}{\\lambda}",
    unit: "J",
    description: "f සංඛ්යාතයක් හෝ \\lambda තරංග ආයාමයක් සහිත තනි ෆෝටෝනයක ශක්තිය සෙවීමේ මූලික සමීකරණය.",
    tags: "Photon, ෆෝටෝනය, Energy, ශක්තිය, Planck"
  },
  {
    id: 30,
    name: "ප්ලාන්ක් සමීකරණය (Planck's Equation)",
    formula: "E = nhf",
    unit: "J",
    description: "සංඛ්යාතය f වන විද්යුත් චුම්භක විකිරණයක ෆෝටෝන n සංඛ්යාවක මුළු ශක්තිය.",
    tags: "ප්ලාන්ක් නියමය, Planck, Quanta, ක්වොන්ටා"
  },
  {
    id: 31,
    name: "දේහලි සංඛ්යාතය හා කාර්ය ශ්රිතය (Threshold Frequency and Work Function)",
    formula: "\\phi = hf_0",
    unit: "J",
    description: "ලෝහ පෘෂ්ඨයකින් ඉලෙක්ට්රෝනයක් නිදහස් කිරීම සඳහා අවශ්ය අවම ශක්තිය (කාර්ය ශ්රිතය) සහ දේහලි සංඛ්යාතය අතර සම්බන්ධය.",
    tags: "Work function, කාර්ය ශ්රිතය, Threshold frequency, දේහලි සංඛ්යාතය"
  },
  {
    id: 32,
    name: "උපරිම චාලක ශක්තිය හා නැවතුම් විභවය (Maximum Kinetic Energy and Stopping Potential)",
    formula: "K_{max} = e V_s",
    unit: "J",
    description: "ප්රකාශ විද්යුත් ආචරණයේදී පිටවන ඉලෙක්ට්රෝනවල උපරිම චාලක ශක්තිය සහ එය නැවැත්වීමට යෙදිය යුතු නැවතුම් විභවය (V_s) අතර සම්බන්ධය.",
    tags: "ප්රකාශ විද්යුත් ආචරණය, Photoelectric, Stopping potential, නැවතුම් විභවය"
  },
  {
    id: 33,
    name: "අයින්ස්ටයින්ගේ ප්රකාශ විද්යුත් සමීකරණය (Einstein's Photoelectric Equation)",
    formula: "hf = \\phi + K_{max}",
    unit: "J",
    description: "පතිත ෆෝටෝනයක ශක්තිය, ලෝහයේ කාර්ය ශ්රිතය සහ පිටවන ඉලෙක්ට්රෝනයේ උපරිම චාලක ශක්තිය අතර ශක්ති සංස්ථිති සම්බන්ධය.",
    tags: "Photoelectric effect, අයින්ස්ටයින්, ප්රකාශ විද්යුත්, Einstein"
  },
  {
    id: 34,
    name: "ඩි බ්රොග්ලි තරංග ආයාමය (De Broglie Wavelength)",
    formula: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}",
    unit: "m",
    description: "v ප්රවේගයෙන් චලනය වන m ස්කන්ධයක් ඇති අංශුවක් සමග බැඳී ඇති පදාර්ථ තරංගයේ තරංග ආයාමය.",
    tags: "ඩි බ්රොග්ලි, De Broglie, පදාර්ථ තරංග, Matter waves, Momentum"
  },
  {
    id: 35,
    name: "චාලක ශක්තිය ඇසුරෙන් ඩි බ්රොග්ලි තරංග ආයාමය (De Broglie Wavelength using Kinetic Energy)",
    formula: "\\lambda = \\frac{h}{\\sqrt{2mK}}",
    unit: "m",
    description: "K චාලක ශක්තියක් ඇති අංශුවක පදාර්ථ තරංග ආයාමය ගණනය කිරීම.",
    tags: "De Broglie, Kinetic energy, චාලක ශක්තිය, තරංග ආයාමය"
  },
  {
    id: 36,
    name: "ත්වරක විභවය ඇසුරෙන් ඩි බ්රොග්ලි තරංග ආයාමය (De Broglie Wavelength using Accelerating Potential)",
    formula: "\\lambda = \\frac{h}{\\sqrt{2mVe}}",
    unit: "m",
    description: "V විභව අන්තරයක් මගින් නිශ්චලතාවයේ සිට ත්වරණය කළ ඉලෙක්ට්රෝනයක ඩි බ්රොග්ලි තරංග ආයාමය.",
    tags: "Accelerating potential, ත්වරක විභවය, Electron, ඉලෙක්ට්රෝන"
  },
  {
    id: 37,
    name: "X-කිරණ අවම තරංග ආයාමය (X-Ray Minimum Wavelength)",
    formula: "\\lambda_{min} = \\frac{hc}{eV}",
    unit: "m",
    description: "V විභවයකින් ත්වරණය කළ ඉලෙක්ට්රෝන මගින් නිපදවිය හැකි X-කිරණවල (සන්තතික වර්ණාවලියේ) අවම තරංග ආයාමය.",
    tags: "X-rays, X-කිරණ, Wavelength, තරංග ආයාමය, Voltage"
  },
  {
    id: 38,
    name: "අයින්ස්ටයින්ගේ ස්කන්ධ-ශක්ති සමීකරණය (Einstein's Mass-Energy Equivalence)",
    formula: "E = mc^2",
    unit: "J",
    description: "පදාර්ථයේ ස්කන්ධය ශක්තිය බවට පරිවර්තනය වීමේදී මුක්ත වන මුළු ශක්ති ප්රමාණය.",
    tags: "Mass-energy, ස්කන්ධ-ශක්ති, අයින්ස්ටයින්, Einstein, Relativity"
  },
  {
    id: 39,
    name: "ස්කන්ධ දෝෂය (Mass Defect)",
    formula: "\\Delta m = Z m_p + (A-Z) m_n - M",
    unit: "kg / u",
    description: "න්යෂ්ටියක් සෑදීමේදී නිදහස් නියුක්ලියෝනවල මුළු ස්කන්ධයත්, සෑදුණු න්යෂ්ටියේ ස්ත්ය ස්කන්ධයත් (M) අතර ඇති වෙනස.",
    tags: "Mass defect, ස්කන්ධ දෝෂය, Nucleus, න්යෂ්ටිය"
  },
  {
    id: 40,
    name: "න්යෂ්ටික බන්ධන ශක්තිය (Nuclear Binding Energy)",
    formula: "BE = \\Delta m \\times c^2",
    unit: "J (or MeV)",
    description: "න්යෂ්ටියක ස්කන්ධ දෝෂය හේතුවෙන් පවතින බන්ධන ශක්තිය. ප්රායෝගිකව 1 u සඳහා 931.5 MeV යොදා ගණනය කෙරේ.",
    tags: "Binding energy, බන්ධන ශක්තිය, Mass defect, න්යෂ්ටික බල"
  },
  {
    id: 41,
    name: "විකිරණශීලී ක්ෂය වීමේ නියමය (Law of Radioactive Decay - Differential)",
    formula: "\\frac{dN}{dt} = -\\lambda N",
    unit: "s^{-1}",
    description: "යම් මොහොතක විකිරණශීලී සාම්පලයක ක්ෂය වීමේ සීඝ්රතාව එම මොහොතේ පවතින න්යෂ්ටි ගණනට අනුලෝමව සමානුපාතික වේ.",
    tags: "Radioactive decay, විකිරණශීලිතාව, ක්ෂය වීම, Rate"
  },
  {
    id: 42,
    name: "සාම්පලයක සක්රියතාව (Activity of a Sample)",
    formula: "A = \\lambda N",
    unit: "Bq",
    description: "යම් මොහොතක පවතින න්යෂ්ටි ගණන (N) සහ ක්ෂය නියතය (\\lambda) භාවිතයෙන් එම මොහොතේ සක්රියතාව සෙවීම.",
    tags: "Activity, සක්රියතාව, Becquerel, බෙක්රල්"
  },
  {
    id: 43,
    name: "විකිරණශීලී ක්ෂය වීමේ සමීකරණය (Radioactive Decay Equation for Nuclei)",
    formula: "N = N_0 e^{-\\lambda t}",
    unit: "-",
    description: "ආරම්භයේදී N_0 න්යෂ්ටි ගණනක් තිබූ සාම්පලයක t කාලයකට පසු ඉතිරි වී ඇති විකිරණශීලී න්යෂ්ටි සංඛ්යාව (N).",
    tags: "Decay equation, ක්ෂය නියමය, න්යෂ්ටි සංඛ්යාව, Nuclei"
  },
  {
    id: 44,
    name: "සක්රියතාව සඳහා ක්ෂය වීමේ සමීකරණය (Activity Decay Equation)",
    formula: "A = A_0 e^{-\\lambda t}",
    unit: "Bq",
    description: "ආරම්භක සක්රියතාව A_0 වන සාම්පලයක t කාලයකට පසු පවතින සක්රියතාව (A) ගණනය කිරීම.",
    tags: "Activity decay, සක්රියතාව, Radioactivity, විකිරණශීලිතාව"
  },
  {
    id: 45,
    name: "අර්ධ ආයු කාලය (Half-life)",
    formula: "T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}",
    unit: "s",
    description: "විකිරණශීලී ද්රව්යයක ආරම්භක න්යෂ්ටි සංඛ්යාවෙන් හරි අඩක් ක්ෂය වී යාමට ගතවන කාලය.",
    tags: "Half-life, අර්ධ ආයු කාලය, Decay constant, ක්ෂය නියතය"
  },
  {
    id: 46,
    name: "කාබන් දිනැයුම කාලය (Carbon Dating Time Equation)",
    formula: "t = \\frac{1}{\\lambda} \\ln\\left(\\frac{A_0}{A}\\right)",
    unit: "s / Years",
    description: "පුරාවිද්යාත්මක සාම්පලවල වයස නිර්ණය කිරීම සඳහා කාබන්-14 සක්රියතාව ඇසුරෙන් කාලය (t) සෙවීම.",
    tags: "Carbon dating, කාබන් දිනැයුම, Age, කාලය, Radioactivity"
  },
  {
    id: 47,
    name: "චුම්භක ක්ෂේත්රයක් තුළ ආරෝපිත අංශුවක ගමන් පථයේ අරය (Radius of Charged Particle in Magnetic Field)",
    formula: "r = \\frac{mv}{qB}",
    unit: "m",
    description: "B චුම්භක ස්රාව ඝනත්වයක් තුළ v ප්රවේගයෙන් ගමන් කරන q ආරෝපණයක් ඇති අංශුවක වෘත්තාකාර පථයේ අරය. (අංශු ත්වරකවලදී භාවිත වේ).",
    tags: "Magnetic field, චුම්භක ක්ෂේත්රය, Particle accelerator, අංශු ත්වරක, Radius"
  }
];
