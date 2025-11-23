import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
 
import { ChatService } from './app/services/chat.service';
import { LoginService } from './app/services/login.service';
import { ChatPlugin } from './app/chat-plugin';

(async () => {
  console.log('💬 Chat Plugin - Initializing...');
  
  const app = await createApplication({
    providers: [
      importProvidersFrom(BrowserModule, HttpClientModule),
      ChatService,
      LoginService
    ]
  });

  const ChatPluginElement = createCustomElement(ChatPlugin, { 
    injector: app.injector 
  });

  customElements.define('chat-plugin-fe', ChatPluginElement);  // ✅ Cambiato!
  
  console.log('✅ Chat Plugin - Registered as <chat-plugin-fe>');
})();