import React, { createContext, useContext, useState, useEffect } from "react";

export type PageName = 
  | "landing"
  | "login"
  | "dashboard"
  | "recommend"
  | "details"
  | "watchlist"
  | "trending"
  | "profile"
  | "admin";

interface NavigationContextType {
  currentPage: PageName;
  currentParams: any;
  navigateTo: (page: PageName, params?: any) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [historyStack, setHistoryStack] = useState<{ page: PageName; params: any }[]>([]);
  const [currentPage, setCurrentPage] = useState<PageName>("landing");
  const [currentParams, setCurrentParams] = useState<any>(null);

  // Sync hash changes on first load or manual URL edits
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash; // e.g. #/details/inception or #/dashboard
      if (!hash || hash === "#" || hash === "#/") {
        setCurrentPage("landing");
        setCurrentParams(null);
        return;
      }

      const parts = hash.replace("#/", "").split("/");
      const page = parts[0] as PageName;
      const paramId = parts[1];

      const validPages: PageName[] = [
        "landing",
        "login",
        "dashboard",
        "recommend",
        "details",
        "watchlist",
        "trending",
        "profile",
        "admin"
      ];

      if (validPages.includes(page)) {
        setCurrentPage(page);
        if (paramId) {
          setCurrentParams({ id: paramId });
        }
      } else {
        setCurrentPage("landing");
        setCurrentParams(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Trigger once on mount

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigateTo = (page: PageName, params: any = null) => {
    // Record history
    setHistoryStack((prev) => [...prev, { page: currentPage, params: currentParams }]);
    
    // Update state and URL hash
    setCurrentPage(page);
    setCurrentParams(params);
    
    let newHash = `#/${page}`;
    if (params && params.id) {
      newHash += `/${params.id}`;
    }
    window.location.hash = newHash;
  };

  const goBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
      setCurrentPage(prev.page);
      setCurrentParams(prev.params);

      let newHash = `#/${prev.page}`;
      if (prev.params && prev.params.id) {
        newHash += `/${prev.params.id}`;
      }
      window.location.hash = newHash;
    } else {
      navigateTo("dashboard");
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, currentParams, navigateTo, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
