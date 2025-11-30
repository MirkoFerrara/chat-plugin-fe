import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  @Input() messageGroup!: ChatMessage[];
  @Input() isOwnMessage = false;

  @Output() fileClick = new EventEmitter<{ url: string; name: string }>();

  ngOnInit() {
    // ✅ AGGIUNGI QUESTO LOG
    console.log('🔵 ChatMessage ricevuto:', {
      isOwnMessage: this.isOwnMessage,
      senderId: this.messageGroup[0]?.senderId
    });
  }
  
  isImage(fileName?: string): boolean {
    return !!fileName && /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
  }

  openImagePreview(src: string, name: string) {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '9999',
      cursor: 'zoom-out'
    });

    const img = document.createElement('img');
    img.src = src;
    img.alt = name;
    Object.assign(img.style, {
      maxWidth: '90vw',
      maxHeight: '90vh',
      borderRadius: '12px',
      boxShadow: '0 4px 30px rgba(0,0,0,0.6)'
    });

    overlay.addEventListener('click', () => overlay.remove());
    overlay.appendChild(img);
    document.body.appendChild(overlay);
  }

  formatTime(dateStr?: string) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
