// SPDX-License-Identifier: GPL-2.0-or-later WITH GStreamer-exception-2008
// SPDX-FileCopyrightText: 2026 The Sushi authors

import Gio from 'gi://Gio';
import Sushi from 'gi://Sushi';

import {Klass as PdfRenderer} from './pdf.js';
import * as Libreoffice from './libreoffice.js';

PdfRenderer.convertLibreoffice = (renderer, file, fileInfo) => {
    const targetUri = fileInfo.get_attribute_string(Gio.FILE_ATTRIBUTE_STANDARD_TARGET_URI);
    const source = targetUri ? Gio.File.new_for_uri(targetUri) : file;

    Sushi.convert_libreoffice(source, renderer.cancellable, (o, res) => {
        try {
            const convertedFile = Sushi.convert_libreoffice_finish(res);
            renderer._loadFile(convertedFile);
        } catch (error) {
            renderer.markFailed(error);
        }
    });
};

export const Klass = PdfRenderer;

export const contentTypes = Libreoffice.isAvailable() ? [] : Libreoffice.officeTypes;
