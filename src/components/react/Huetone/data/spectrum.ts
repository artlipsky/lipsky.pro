export type Degree = {
  degree: string;
  name: string;
  color: string;
  bg: string;
  text: string;
  border: string;
};

export const spectrum: Degree[] = [
  { degree: "1",  name: "Tonic",            color: "red",     bg: "bg-red-500",     text: "text-red-500",     border: "border-red-500" },
  { degree: "2b", name: "Flat Supertonic",  color: "orange",  bg: "bg-orange-500",  text: "text-orange-500",  border: "border-orange-500" },
  { degree: "2",  name: "Supertonic",       color: "yellow",  bg: "bg-yellow-500",  text: "text-yellow-500",  border: "border-yellow-500" },
  { degree: "3m", name: "Flat Mediant",     color: "lime",    bg: "bg-lime-500",    text: "text-lime-500",    border: "border-lime-500" },
  { degree: "3M", name: "Mediant",          color: "green",   bg: "bg-green-500",   text: "text-green-500",   border: "border-green-500" },
  { degree: "4P", name: "Subdominant",      color: "emerald", bg: "bg-emerald-500", text: "text-emerald-500", border: "border-emerald-500" },
  { degree: "5b", name: "Tritone",          color: "cyan",    bg: "bg-cyan-500",    text: "text-cyan-500",    border: "border-cyan-500" },
  { degree: "5P", name: "Dominant",         color: "sky",     bg: "bg-sky-500",     text: "text-sky-500",     border: "border-sky-500" },
  { degree: "6m", name: "Flat Submediant",  color: "blue",    bg: "bg-blue-500",    text: "text-blue-500",    border: "border-blue-500" },
  { degree: "6M", name: "Submediant",       color: "violet",  bg: "bg-violet-500",  text: "text-violet-500",  border: "border-violet-500" },
  { degree: "7m", name: "Subtonic",         color: "fuchsia", bg: "bg-fuchsia-500", text: "text-fuchsia-500", border: "border-fuchsia-500" },
  { degree: "7M", name: "Leading Tone",     color: "pink",    bg: "bg-pink-500",    text: "text-pink-500",    border: "border-pink-500" },
];
